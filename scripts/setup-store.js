#!/usr/bin/env node
"use strict";

const admin = require("firebase-admin");
const path  = require("path");
const fs    = require("fs");
const vm    = require("vm");

// ── Load DEFAULT_MENU from menu-data.js ──
// vm 沙箱中 const/let 不綁到 context，改成 var 才能從 ctx 取出
const menuScript = fs.readFileSync(path.join(__dirname, "..", "menu-data.js"), "utf8")
  .replace(/^\s*const\s+DEFAULT_MENU\s*=/, "var DEFAULT_MENU =");
const menuCtx = {};
vm.runInNewContext(menuScript, menuCtx);
const DEFAULT_MENU = menuCtx.DEFAULT_MENU;

// ── Arg parser ──
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  let i = 0;
  while (i < args.length) {
    if (args[i] === "--force") { result.force = true; i++; }
    else if (args[i].startsWith("--")) { result[args[i].slice(2)] = args[i + 1]; i += 2; }
    else i++;
  }
  return result;
}

function usage() {
  console.log(`
使用方式：
  node scripts/setup-store.js \\
    --storeId          <id>      \\
    --storeName        <名稱>    \\
    --ownerEmail       <email>   \\
    --ownerPassword    <密碼>    \\
    --ownerDisplayName <顯示名稱> \\
    --subtitle         <副標題>  \\
    --address          <地址>    \\
    --phone            <電話>    \\
    --hours            <營業時間> \\
    --closedDay        <公休說明> \\
    [--force]          強制覆蓋已存在的 storeId

範例：
  node scripts/setup-store.js \\
    --storeId        demo \\
    --storeName      "Demo 早餐" \\
    --ownerEmail     demo@example.com \\
    --ownerPassword  Demo1234! \\
    --ownerDisplayName "Demo 老闆" \\
    --subtitle       "早午餐" \\
    --address        "台北市信義區..." \\
    --phone          "02 1234 5678" \\
    --hours          "07:00 - 14:00" \\
    --closedDay      "週一公休"
`);
  process.exit(1);
}

// ── Firebase Admin init ──
const ROOT = path.join(__dirname, "..");
const SA_FILE = fs.readdirSync(ROOT).find(f =>
  f.startsWith("ririchu-14b81-firebase-adminsdk") && f.endsWith(".json")
);
if (!SA_FILE) {
  console.error("找不到 service account key（ririchu-14b81-firebase-adminsdk-*.json）");
  process.exit(1);
}
admin.initializeApp({ credential: admin.credential.cert(require(path.join(ROOT, SA_FILE))) });
const auth       = admin.auth();
const db         = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// ── Main ──
async function run() {
  const args = parseArgs();

  const REQUIRED = ["storeId", "storeName", "ownerEmail", "ownerPassword", "ownerDisplayName"];
  const missing = REQUIRED.filter(k => !args[k]);
  if (missing.length) {
    console.error("缺少必要參數：" + missing.map(k => `--${k}`).join(", "));
    usage();
  }

  const {
    storeId, storeName, ownerEmail, ownerPassword, ownerDisplayName,
    subtitle   = "",
    address    = "",
    phone      = "",
    hours      = "",
    closedDay  = "",
    force      = false,
  } = args;

  // 1. 防呆：storeId 已存在
  const storeRef  = db.collection("stores").doc(storeId);
  const storeSnap = await storeRef.get();
  if (storeSnap.exists && !force) {
    console.error(`stores/${storeId} 已存在。加上 --force 可強制覆蓋。`);
    process.exit(1);
  }
  if (storeSnap.exists && force) {
    console.warn(`⚠  --force：覆蓋 stores/${storeId}`);
  }

  // 2. 建立或取得 owner Auth 帳號
  let ownerUid;
  try {
    const existing = await auth.getUserByEmail(ownerEmail);
    ownerUid = existing.uid;
    console.log(`⚠  ${ownerEmail} 已存在 (uid: ${ownerUid})，跳過建立帳號，繼續更新 Firestore。`);
  } catch (e) {
    if (e.code !== "auth/user-not-found") throw e;
    const created = await auth.createUser({
      email:       ownerEmail,
      password:    ownerPassword,
      displayName: ownerDisplayName,
    });
    ownerUid = created.uid;
    console.log(`✔  建立 owner 帳號：${ownerEmail} (${ownerUid})`);
  }

  // 3. 寫入 stores/{storeId}
  await storeRef.set({
    storeName,
    subtitle,
    address,
    phone,
    hours,
    closedDay,
    logo:      "",
    theme:     { primary: "#1a2535", accent: "#c8861a" },
    layout:    "default",
    active:    true,
    createdAt: FieldValue.serverTimestamp(),
  });
  console.log(`✔  stores/${storeId} 寫入完成`);

  // 4. 寫入 users/{ownerUid}
  await db.collection("users").doc(ownerUid).set({
    storeId,
    role:        "owner",
    displayName: ownerDisplayName,
    createdAt:   FieldValue.serverTimestamp(),
  });
  console.log(`✔  users/${ownerUid} 寫入完成 (role: owner)`);

  // 5. 寫入 stores/{storeId}/menu（batch，每次最多 400 筆）
  const menuRef   = storeRef.collection("menu");
  const CHUNK     = 400;
  for (let i = 0; i < DEFAULT_MENU.length; i += CHUNK) {
    const batch = db.batch();
    DEFAULT_MENU.slice(i, i + CHUNK).forEach((item, idx) => {
      batch.set(menuRef.doc(item.id), { ...item, sortOrder: i + idx });
    });
    await batch.commit();
  }
  console.log(`✔  stores/${storeId}/menu 寫入完成（${DEFAULT_MENU.length} 筆）`);

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
新店家初始化完成
  storeId    : ${storeId}
  storeName  : ${storeName}
  owner      : ${ownerEmail}
  ownerUid   : ${ownerUid}
  menu items : ${DEFAULT_MENU.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });

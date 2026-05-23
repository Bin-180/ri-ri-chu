# 正式交付前檢查清單

交付前請逐項確認，全部 ✅ 才算可交付。

版本：**v1.0.0-beta**
檢查日期：___________
檢查人：___________

---

## 前台

- [ ] **前台可載入**
  - 開啟 `https://ririchu-14b81.web.app/?store=ririchu`
  - 確認店名、Logo、菜單分類正確顯示

- [ ] **demo store 可載入**
  - 開啟 `https://ririchu-14b81.web.app/?store=demo`
  - 確認顯示的是 demo 店家資料，不是 ririchu

- [ ] **客人可送單（內用）**
  - 選品項 → 填桌號 → 送出訂單 → 確認送出成功提示

- [ ] **客人可送單（外帶）**
  - 切換外帶 → 填姓名、電話、取餐時間 → 送出 → 確認送出成功提示

---

## 後台帳號與權限

- [ ] **owner 可登入**
  - 開啟 `https://ririchu-14b81.web.app/admin.html`
  - 確認可登入，tab bar 顯示全部功能（收單、訂單明細、統計、菜單、QR Code、店家設定、員工帳號、系統檢查）

- [ ] **staff 帳號權限正確**
  - 以 staff 帳號登入，確認只看到「收單」tab
  - 確認無法存取菜單管理、訂單明細等

- [ ] **manager 帳號權限正確**
  - 以 manager 帳號登入，確認只看到「收單、訂單明細、統計數據、QR Code」
  - 確認無法存取菜單管理、員工帳號、系統檢查

---

## 後台核心功能

- [ ] **後台可完成出餐**
  - 確認前台送單後，收單頁出現新訂單
  - 點「✓ 完成出餐」，確認訂單從收單頁消失
  - 切換訂單明細，確認訂單已記錄

- [ ] **CSV 可匯出**
  - 在「訂單明細」tab 選好日期，按「匯出 CSV」
  - 確認下載檔案，用 Excel 開啟確認中文正常顯示

- [ ] **菜單可編輯**
  - 在「菜單管理」tab 編輯一個品項，儲存後確認前台更新

- [ ] **菜單可排序**
  - 按「排序」進入排序模式，調整品項順序，按「完成排序」
  - 確認前台顯示順序改變

- [ ] **QR Code 正確**
  - 在「QR Code」tab 確認 QR Code 顯示
  - 掃描 QR Code，確認跳轉到正確的點餐網址

---

## PWA

- [ ] **manifest.webmanifest 正常**
  - 執行：`curl -I https://ririchu-14b81.web.app/manifest.webmanifest`
  - 確認 HTTP 200，Content-Type: application/manifest+json

- [ ] **sw.js 正常**
  - 執行：`curl -I https://ririchu-14b81.web.app/sw.js`
  - 確認 HTTP 200，Cache-Control: no-cache, no-store, must-revalidate

- [ ] **Service Worker 可安裝（手動確認）**
  - 用 Chrome 開啟前台，DevTools → Application → Service Workers
  - 確認 sw.js 已 activated，無 error

---

## 文件公開狀態

- [ ] **對外文件可存取**
  - `https://ririchu-14b81.web.app/docs/OWNER_GUIDE.md` → HTTP 200
  - `https://ririchu-14b81.web.app/docs/STAFF_GUIDE.md` → HTTP 200

- [ ] **內部文件不可存取**
  - `https://ririchu-14b81.web.app/docs/NEW_STORE_SETUP.md` → HTTP 404
  - `https://ririchu-14b81.web.app/docs/DEPLOYMENT.md` → HTTP 404

---

## 安全

- [ ] **service account key 未部署**
  - 確認 `*firebase-adminsdk*.json` 不在 Hosting 上
  - 執行：`curl -I https://ririchu-14b81.web.app/ririchu-14b81-firebase-adminsdk-fbsvc-2ebce189b0.json`
  - 預期回傳 HTTP 404

- [ ] **service account key 未 commit**
  - 執行：`git log --all --full-history -- "*firebase-adminsdk*"`
  - 預期無任何輸出

- [ ] **scripts 未部署**
  - 執行：`curl -I https://ririchu-14b81.web.app/scripts/setup-store.js`
  - 預期 HTTP 404

---

## Firestore

- [ ] **Firestore Rules 已部署**
  - 開啟 Firebase Console → Firestore → Rules
  - 確認規則版本與本機 `firestore.rules` 一致
  - 或執行：`firebase deploy --only firestore:rules`

---

## 最終確認

- [ ] 以上所有項目均已確認 ✅
- [ ] 交付給店家的網址已確認可用
- [ ] 老闆帳號密碼已安全傳達（不透過公開管道）
- [ ] 員工帳號已依需求建立

**簽核：___________　日期：___________**

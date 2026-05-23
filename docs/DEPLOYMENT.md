# 部署與維護說明

本文件說明系統的部署流程、更新注意事項，以及安全限制。

---

## 部署指令

### 部署前台與後台（最常用）

每次修改 HTML / CSS / JS / manifest / sw.js 後，執行：

```bash
firebase deploy --only hosting
```

這會將以下檔案上傳到 Firebase Hosting：
`index.html`、`admin.html`、`qrcode.html`、`styles.css`、`app.js`、`firebase-config.js`、`app-config.js`、`store-config.js`、`store-loader.js`、`db-helpers.js`、`menu-data.js`、`pwa.js`、`sw.js`、`manifest.webmanifest`、`logo.jpg`、`icons/`

### 部署 Firestore 安全規則

修改 `firestore.rules` 後，執行：

```bash
firebase deploy --only firestore:rules
```

> 修改 Rules 需謹慎，錯誤的 Rules 可能讓所有人無法讀寫資料，或造成安全漏洞。

### 部署 Firestore 索引

修改 `firestore.indexes.json` 後，執行：

```bash
firebase deploy --only firestore:indexes
```

### 同時部署全部

```bash
firebase deploy
```

---

## Hosting ignore 清單

以下為 `firebase.json` 的完整 `ignore` 清單，**不會**被上傳到 Hosting：

| 檔案 / 資料夾 | 原因 |
|--------------|------|
| `*firebase-adminsdk*.json` | Admin SDK 金鑰，絕對不可公開 |
| `scripts/**` | 後端初始化腳本，不需公開 |
| `node_modules/**` | 套件，不需部署 |
| `firestore.rules` | 只需透過 Firebase CLI 部署，不公開 |
| `firestore.indexes.json` | 只需透過 Firebase CLI 部署，不公開 |
| `storage.rules` | 備用規則檔，不部署 |
| `firebase.json` | 部署設定檔，不公開 |
| `.firebaserc` | 專案關聯設定，不公開 |
| `.gitignore`、`README.md` | 開發文件 |
| `.git/**` | git 版本控制資料夾 |
| `.claude/**` | AI 對話記憶，不公開 |
| `package.json`、`package-lock.json` | Node.js 套件設定，不需部署 |
| `setup-test-users.js` | 測試腳本 |
| `*.command` | 本機腳本 |
| `docs/NEW_STORE_SETUP.md` | 內部建店流程，含 service account 說明 |
| `docs/DEPLOYMENT.md` | 部署指令與 service account 安全規範，僅供 operator |
| `CHANGELOG.md` | 版本紀錄，開發文件 |
| `RELEASE_CHECKLIST.md` | 交付前人工檢查清單，開發文件 |

`docs/OWNER_GUIDE.md` 與 `docs/STAFF_GUIDE.md` 為對外文件，會正常部署到 Hosting。

---

## 不使用 Firebase Storage 的原因

本系統採用 Firebase **Spark（免費）方案**。Spark 方案雖然包含 Cloud Firestore 和 Hosting，但 **Firebase Storage 需要 Blaze（付費）方案才能正常使用**。

因此，Logo 圖片改用**外部圖片網址**方式設定（貼上圖片的公開連結），不直接上傳到 Firebase。

若未來升級到 Blaze 方案，可再加入直接上傳功能。

`storage.rules` 檔案保留在本機（備用），但已從 `firebase.json` 的部署設定中移除，不會被部署。

---

## Service Account 金鑰安全規範

### 金鑰位置

```
ririchu-14b81-firebase-adminsdk-fbsvc-xxxxxxxx.json
```

這個金鑰讓持有者擁有**管理整個 Firebase 專案的最高權限**，包含讀寫所有資料、建立刪除帳號等。

### 規範

1. **絕對不可 commit 到 git**（`.gitignore` 已設定排除）
2. **絕對不可上傳到 GitHub / GitLab / 任何公開 repo**
3. **不可複製給第三方**
4. 金鑰只用於本機執行 `scripts/setup-store.js`（建立新店家）
5. 若金鑰不小心外洩，立即至 Firebase Console → 專案設定 → 服務帳戶 → 刪除並重新產生

### 確認金鑰未被 commit

```bash
git log --all --full-history -- "*firebase-adminsdk*"
```

若有輸出，代表金鑰曾被 commit，必須從 git history 清除並立即更換金鑰。

---

## PWA 更新後如何確認 sw.js 生效

Service Worker（`sw.js`）在瀏覽器中會被快取，更新後需要確認使用者取得新版本。

### sw.js 已設定不快取

`firebase.json` 中已設定 `sw.js` 的 HTTP 標頭：

```json
{
  "source": "/sw.js",
  "headers": [{ "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }]
}
```

這確保每次請求 `sw.js` 都會取得最新版本（不走瀏覽器快取）。

### 測試步驟

1. 部署完成後，在 Chrome 開啟 `https://ririchu-14b81.web.app/`
2. 開啟 DevTools（F12）→ Application → Service Workers
3. 確認顯示的 sw.js 是最新版本（比較 `const CACHE = 'xiaobin-v2'` 等版本字串）
4. 若要強制更新：點「Update」或勾選「Update on reload」後重新整理

### 版本管理

若 sw.js 有重大變更（例如新增快取檔案），請修改 `sw.js` 頂部的 `CACHE` 名稱：

```js
const CACHE = 'xiaobin-v3'; // 版本升一號
```

舊版 cache 會在 activate 事件中自動清除。

---

## Firestore 安全規則架構說明

目前已部署的 Rules（`firestore.rules`）主要保護以下路徑：

| 路徑 | 讀取 | 寫入 |
|------|------|------|
| `stores/{storeId}` | 任何人（前台需要讀店家資料） | 只有 owner |
| `stores/{storeId}/menu` | 任何人（前台需要讀菜單） | 只有 owner |
| `stores/{storeId}/orders` | manager / owner | 前台送單（create）、manager 更新狀態 |
| `stores/{storeId}/pendingOrders` | staff / manager / owner | 前台送單（create）、manager / owner 刪除 |
| `stores/{storeId}/members` | staff / manager / owner | 只有 owner |
| `users/{uid}` | 只有本人 | owner 建立 staff/manager、owner 更新角色/啟用狀態 |
| `stores/{storeId}/private` | 只有 owner | 只有 owner |

**不要隨意放寬 Rules**，尤其是 orders / pendingOrders / users 的讀寫權限。

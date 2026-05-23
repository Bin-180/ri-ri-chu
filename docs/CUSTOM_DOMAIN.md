# 自訂網域設定指南

本文件說明如何將 Firebase Hosting 的預設網址換成正式自訂網域，以及所有需要確認的事項。

> 目前正式測試網址：`https://ririchu-14b81.web.app`
> 目標網域範例：`order.example.com`

---

## 1. 目標

- 將顧客點餐網址從 `https://ririchu-14b81.web.app/?store=ririchu` 換成正式品牌網域
- 後台管理、QR Code 等所有連結同步更新
- 換網域後只需修改 `app-config.js` 的一行，其餘程式不須更動

建議子網域格式：

| 格式 | 範例 | 說明 |
|------|------|------|
| `order.storename.com` | `order.ririchuzl.com` | 最直覺，顧客容易記憶 |
| `app.storename.com` | `app.ririchuzl.com` | 適合多功能擴展 |
| `menu.storename.com` | `menu.ririchuzl.com` | 強調點餐功能 |

---

## 2. Firebase Hosting 自訂網域操作步驟

### 前置確認

在開始前，請確認：
- 持有目標網域的所有權（可在 DNS 管理台新增記錄）
- 網域 DNS 管理平台的帳號與密碼（常見：GoDaddy、Cloudflare、Google Domains、網路中文等）

### 步驟

**Step 1 — Firebase Console 新增網域**

1. 開啟 [Firebase Console](https://console.firebase.google.com/) → 選擇 `ririchu-14b81` 專案
2. 左側選單 → **Hosting**
3. 點擊「**Add custom domain**」（或「新增自訂網域」）
4. 輸入要綁定的網域，例如 `order.ririchuzl.com`
5. 點擊「**Continue**」

**Step 2 — DNS 驗證（TXT 記錄）**

Firebase 會要求先驗證你擁有這個網域：

1. Firebase 會提供一筆 **TXT 記錄**，格式如：
   ```
   Type: TXT
   Name: order.ririchuzl.com  （或 @）
   Value: firebase=xxxxxxxxxxxx
   ```
2. 登入你的 DNS 管理平台，新增此 TXT 記錄
3. 回到 Firebase Console，點擊「**Verify**」
4. DNS 生效約需 5 分鐘～48 小時（多數在 30 分鐘內完成）

**Step 3 — 加入 A / CNAME 記錄**

驗證通過後，Firebase 提供正式的 DNS 指向記錄，需擇一設定：

- **子網域**（推薦，例如 `order.ririchuzl.com`）：
  ```
  Type: CNAME
  Name: order
  Value: ririchu-14b81.web.app
  ```

- **根網域**（例如 `ririchuzl.com`）：
  ```
  Type: A
  Name: @
  Value: 151.101.1.195
  Value: 151.101.65.195
  ```
  （Firebase 提供的 IP 以 Console 顯示為準）

> 建議優先使用子網域（CNAME），設定較簡單，且不影響主網域的其他服務。

**Step 4 — 等待 SSL 憑證生效**

- DNS 記錄設定完成後，Firebase 會自動申請並簽發 SSL 憑證（Let's Encrypt）
- 狀態從「**Pending**」變為「**Connected**」約需 10 分鐘～24 小時
- 憑證生效後，`https://order.ririchuzl.com` 即可正常存取

---

## 3. 上線前確認事項

| 確認項目 | 說明 |
|---------|------|
| 網域持有人 | 確認網域由本店或負責人持有，非第三方代管 |
| DNS 管理權限 | 能夠登入 DNS 管理台，有新增 / 修改記錄的權限 |
| 使用子網域 | 建議使用子網域（`order.xxx.com`），避免影響主網域的其他服務（官網、信箱等） |
| SSL 狀態 | Firebase Console 中該網域狀態須為「Connected」，非「Pending」 |
| HTTPS 可存取 | 在瀏覽器輸入新網域，確認 HTTPS 憑證有效（瀏覽器鎖頭圖示正常） |
| Firebase Hosting 回 200 | 用 `curl -I https://order.xxx.com/` 確認回傳 HTTP 200 |

---

## 4. 程式需要修改的地方

換網域只需修改 **一個檔案的一行**。

### 修改 `app-config.js`

```js
// 修改前
const APP_CONFIG = {
  baseUrl: "https://ririchu-14b81.web.app",
  ...
};

// 修改後
const APP_CONFIG = {
  baseUrl: "https://order.ririchuzl.com",  // ← 只改這行
  ...
};
```

### 重新部署

```bash
firebase deploy --only hosting
```

### 重新產生 QR Code

修改並部署後：

1. 登入後台 → 切換到「QR Code」tab
2. 確認名片上的網址已更新為新網域
3. 重新列印 QR Code（舊 QR Code 若仍指向 Firebase 預設網址，需換掉）

---

## 5. 測試清單

切換網域後，請逐項確認：

- [ ] `https://order.xxx.com/?store=ririchu` → 前台正常載入，店名、菜單顯示正確
- [ ] `https://order.xxx.com/admin.html` → 後台登入頁正常，可登入
- [ ] `https://order.xxx.com/qrcode.html?store=ririchu` → QR Code 名片正常顯示，網址為新網域
- [ ] `https://order.xxx.com/manifest.webmanifest` → HTTP 200，Content-Type 正確
- [ ] `https://order.xxx.com/sw.js` → HTTP 200，Cache-Control: no-cache
- [ ] 掃描新列印的 QR Code → 跳轉到新網域的點餐頁，非舊網址
- [ ] 送出一筆測試訂單 → 後台收到，完成出餐流程
- [ ] 系統檢查 tab → 確認 baseUrl 與 QR Code 網址顯示為新網域

---

## 6. 回滾方式

若新網域發生問題，可立即回滾：

**Step 1 — 還原 `app-config.js`**

```js
const APP_CONFIG = {
  baseUrl: "https://ririchu-14b81.web.app",  // 改回原始值
  ...
};
```

**Step 2 — 重新部署**

```bash
firebase deploy --only hosting
```

**Step 3 — 通知使用者**

Firebase Hosting 預設網址（`ririchu-14b81.web.app`）在自訂網域設定期間仍持續有效，回滾後即刻可用，無需等待 DNS 傳播。

> 舊 QR Code（指向 `ririchu-14b81.web.app`）在回滾後仍可正常使用。

---

## 附錄：常見 DNS 設定平台

| 平台 | 操作入口 |
|------|---------|
| Cloudflare | dash.cloudflare.com → 選擇網域 → DNS |
| GoDaddy | account.godaddy.com → 我的產品 → DNS |
| Google Domains（現為 Squarespace） | domains.google.com → 管理 → DNS |
| 網路中文 / Hinet | 各平台控制台 → 網域管理 → DNS 設定 |

DNS 設定完成後建議用 [dnschecker.org](https://dnschecker.org) 確認全球傳播狀態。

# 產品路線圖

## 目前狀態（v1.0.0-beta）

v1.0.0-beta 已完成多店家點餐系統的核心能力：

- 前台點餐（多店家 `?store=xxx`、內用/外帶、規格選擇）
- 後台完整功能（即時收單、訂單明細、統計、CSV 匯出、菜單管理、QR Code）
- 三層角色權限（owner / manager / staff），Firestore Rules 後端強制
- 店家設定、員工帳號管理、系統檢查
- PWA 支援（可安裝到手機桌面）
- 操作文件（老闆手冊、員工手冊、部署說明）

**目前建議交付方式**：Firebase Hosting + PWA，無需安裝，顧客掃碼即可點餐，老闆與員工加入桌面圖示即可使用後台。這是成本最低、迭代最快的方式，適合正式上線前的實測階段。

---

## 下一階段優先順序

### P0 — 正式上線前必做

這些項目完成前，不建議對外公開宣傳或大量推廣。

| 項目 | 說明 |
|------|------|
| **自訂網域** | 將 `ririchu-14b81.web.app` 換成正式網域（例如 `order.storename.com`），在 Firebase Hosting 設定 Custom Domain |
| **隱私權政策 / 服務條款** | 顧客送出訂單前需可存取隱私權政策，蒐集姓名電話需有法律依據 |
| **實際店家使用測試** | 找 1-2 家真實店家在營業時間試跑，確認收單速度、裝置相容性、網路穩定度 |
| **備份 / 匯出流程確認** | 確認 Firestore 匯出方式（CSV 已有），並建立定期手動備份的 SOP |

---

### P1 — 營運便利性

系統上線後，依使用頻率與店家回饋優先補強。

| 項目 | 說明 |
|------|------|
| **多店家 PWA 優化** | 目前 `manifest.webmanifest` 的 `start_url` 固定為 `/?store=ririchu`；新店家安裝 PWA 會跳到錯誤的店。需依店家動態產生或分開部署 manifest |
| **訂單列印** | 收單後支援一鍵列印出餐單（瀏覽器列印 / 熱感印表機串接） |
| **菜單批次匯入 / 匯出** | 提供 CSV 格式匯入菜單，方便初始化或大量更新，不需逐一手動輸入 |
| **店家公告 / 暫停接單** | owner 可在後台設定「今日暫停接單」或顯示公告，前台自動提示顧客 |
| **缺貨快速切換** | 收單頁加入快速下架按鈕，不需進入菜單管理即可立即停止供應特定品項 |

---

### P2 — 進階功能

這些功能有需求再做，不要提前實作。

| 項目 | 說明 |
|------|------|
| **Push Notification** | 有新訂單時主動推送通知到員工裝置，解決後台需保持開啟的問題。需要 Firebase Cloud Messaging（Blaze 方案）與 VAPID key |
| **成本 / 毛利 / 淨利報表** | owner only，允許輸入品項成本，自動計算毛利率與淨利。財務資料必須存入 `private/` 路徑，嚴禁非 owner 存取 |
| **自動編號規則** | 訂單號碼自訂格式（例如 `A001`、日期前綴），方便口頭確認取餐 |
| **付款串接** | 整合 LINE Pay / 街口支付 / 藍新金流，支援線上付款。需要後端 callback，須升級 Blaze 方案以使用 Cloud Functions |
| **多分店 / 總部後台** | 同一品牌多家分店的整合視圖，總部可跨店查看統計。架構上需新增 `brand` 層級的 Firestore 路徑與 Rules |

---

### P3 — App Store / Google Play 上架

不要急，先用 PWA 累積用量再評估。

| 項目 | 說明 |
|------|------|
| **包裝方式評估** | Capacitor（完整原生橋接）/ TWA（Trusted Web Activity，僅 Android）/ WebView App。建議先用 TWA 快速上架 Android，再評估 iOS |
| **App icon / 截圖** | 需準備各平台尺寸的 icon（iOS 1024×1024、Android 512×512）與商店截圖 |
| **隱私權文件** | Apple / Google 均要求隱私權政策連結，iOS 需填寫資料收集問卷 |
| **審核測試帳號** | 需提供 Apple / Google 審核人員可使用的示範帳號（不可用真實店家帳號） |
| **上架流程** | Apple Developer 帳號 $99/年；Google Play 一次性 $25；審核時間 Apple 約 1-3 天，Google 約 3-7 天 |

---

## 明確建議

1. **先不要急著上架 App Store**：審核流程耗時，且 PWA 在 iOS / Android 的功能已足夠日常使用（可安裝到桌面、全螢幕、離線快取）。

2. **先用 PWA 找 1-2 家店實測**：真實營業環境會暴露設計上的盲點（例如：尖峰時段網速、員工裝置多樣性、顧客掃碼習慣）。用 PWA 迭代比 App Store 版本快得多。

3. **穩定後再做正式 App**：當 PWA 版本在真實店家穩定運行 1-2 個月後，再評估是否有上架 App Store 的實際需求（例如：店家客群習慣從 App Store 安裝、需要 Push Notification）。

---

## 風險與注意事項

### Firebase Spark vs Blaze 方案差異

| 功能 | Spark（免費） | Blaze（付費） |
|------|:------------:|:------------:|
| Firestore 讀寫 | ✅（有配額） | ✅（依用量計費） |
| Hosting | ✅ | ✅ |
| Firebase Storage | ❌ | ✅ |
| Cloud Functions | ❌ | ✅ |
| Cloud Messaging（推播） | ✅（免費） | ✅ |

目前使用 Spark，**Logo 上傳、Push Notification backend、付款 callback** 均受限。若未來需要這些功能，需升級 Blaze（綁定信用卡，依實際用量計費，小流量費用通常極低）。

### Storage / Cloud Functions 需要 Blaze

- 直接上傳 Logo 圖片 → 需要 Firebase Storage → 需要 Blaze
- Push Notification 後端處理 → 需要 Cloud Functions → 需要 Blaze
- 付款回調 → 需要 Cloud Functions → 需要 Blaze

升級前請先評估月流量，避免意外帳單。建議設定 Firebase 用量預算警示。

### 財務資料必須 owner only

成本、毛利、淨利等財務資料**絕對不可**存入 `stores/{storeId}` 的公開路徑。必須存入 `stores/{storeId}/private/` 子集合，Firestore Rules 已設定此路徑只有 owner 可讀寫。任何涉及財務的新功能，開發前都需先確認資料路徑與 Rules。

### Service Account Key 安全

`ririchu-14b81-firebase-adminsdk-*.json` 擁有整個 Firebase 專案的最高管理權限。

- 永遠只存放在本機，不上傳、不分享、不 commit
- 若懷疑外洩，立即至 Firebase Console → 專案設定 → 服務帳戶 → 刪除並重新產生
- 日後若有 CI/CD 需求，應改用 Workload Identity Federation 或 GitHub Actions Secret，而非直接上傳金鑰檔案

# BinOrder

**目前版本：v1.0.0-beta**

以 Firebase 為後端的多租戶線上點餐系統，支援即時收單、菜單管理、員工帳號與 PWA 安裝。

---

## 主要網址

| 用途 | 網址 |
|------|------|
| 前台點餐（日日初） | https://ririchu-14b81.web.app/?store=ririchu |
| 後台管理 | https://ririchu-14b81.web.app/admin.html |
| QR Code 名片 | https://ririchu-14b81.web.app/qrcode.html?store=ririchu |

---

## 功能摘要

### 前台（顧客點餐）
- 依分類瀏覽菜單
- 點選品項加入購物車，可調整數量
- 內用（填桌號）/ 外帶（填姓名、電話、取餐時間）切換
- 品項有規格選項時（例如大杯/小杯）顯示選擇器
- 備註欄位
- 送出訂單後即時傳送至後台
- PWA：可安裝到手機桌面，離線顯示最後快取的菜單

### 後台（老闆與員工）
- **即時收單**：自動更新，一鍵完成出餐
- **訂單明細**：日 / 月切換，匯出 CSV（含 UTF-8 BOM，Excel 可直接開啟）
- **統計數據**：訂單數、營業額、平均客單價、品項銷售排行
- **菜單管理**：新增 / 編輯 / 下架品項，支援規格選項
- **菜單排序**：排序品項與分類顯示順序
- **店家設定**：店名、地址、電話、營業時間、Logo URL、主題色彩
- **QR Code**：自動產生含店家資訊的 QR Code 名片，可列印
- **員工帳號**：新增 staff / manager，停用 / 啟用帳號
- **系統檢查**：一鍵驗證各項設定狀態，warning 可點擊跳到對應設定頁

### 角色權限
| 功能 | staff | manager | owner |
|------|:-----:|:-------:|:-----:|
| 收單 | ✅ | ✅ | ✅ |
| 訂單明細 / CSV | | ✅ | ✅ |
| 統計數據 | | ✅ | ✅ |
| QR Code | | ✅ | ✅ |
| 菜單管理 | | | ✅ |
| 店家設定 | | | ✅ |
| 員工帳號 | | | ✅ |
| 系統檢查 | | | ✅ |

---

## 技術架構

- **前端**：純 HTML / CSS / JS（無框架），Firebase compat SDK v10.12.0
- **後端**：Firebase Firestore（即時資料庫）、Firebase Auth（帳號驗證）
- **部署**：Firebase Hosting（Spark 免費方案）
- **PWA**：Web App Manifest + Service Worker（HTML network-first；CSS/JS stale-while-revalidate；Firestore/Auth bypass）
- **多租戶**：每家店資料隔離在 `stores/{storeId}/` 路徑，Firestore Rules 強制執行

---

## 文件索引

| 文件 | 說明 |
|------|------|
| [docs/OWNER_GUIDE.md](docs/OWNER_GUIDE.md) | 老闆操作手冊（後台所有功能） |
| [docs/STAFF_GUIDE.md](docs/STAFF_GUIDE.md) | 員工操作手冊（收單操作、帳號問題） |
| [docs/NEW_STORE_SETUP.md](docs/NEW_STORE_SETUP.md) | 新店家建立流程（腳本參數、上線檢查清單）— 本機限定 |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | 部署與維護說明（指令、安全規範、PWA 更新）— 本機限定 |
| [CHANGELOG.md](CHANGELOG.md) | 版本紀錄 |
| [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) | 正式交付前人工檢查清單 |

---

## 重要安全注意事項

### Service Account 金鑰不可外洩

檔案名稱：`ririchu-14b81-firebase-adminsdk-*.json`

此金鑰擁有管理整個 Firebase 專案的最高權限。

- **不可 commit 到 git**（`.gitignore` 已設定）
- **不可上傳到 GitHub / 任何公開平台**
- **不可傳給第三方**
- 僅用於本機執行 `scripts/setup-store.js`

若不小心外洩，立即至 Firebase Console 刪除並重新產生金鑰。

### Firebase Hosting 已排除敏感檔案

`firebase.json` 的 `ignore` 清單已排除：金鑰檔案、scripts 資料夾、node_modules、設定檔等，不會被部署到公開網址。

詳見 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。

---

## 快速部署

```bash
# 部署前台後台（最常用）
firebase deploy --only hosting

# 部署 Firestore 安全規則
firebase deploy --only firestore:rules
```

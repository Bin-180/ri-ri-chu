# Changelog

本文件記錄每個版本的功能新增與變更。

---

## v1.0.0-beta — 2026-05-24

首個完整功能版本，涵蓋前台點餐、後台管理、多店家支援與 PWA。

### 前台（顧客點餐）

- **多店家前台**：網址帶 `?store=xxx` 參數，每家店資料完全隔離
- **客人點餐**：分類瀏覽菜單、品項加入購物車、數量調整
- **服務方式**：內用（填桌號）/ 外帶（填姓名、電話、取餐時間）切換
- **規格選擇**：品項有多規格時顯示選擇器（例如大杯 / 小杯）
- **訂單送出**：送出後即時寫入 Firestore，後台立即收到

### 後台（管理）

- **即時收單**：自動監聽新訂單，一鍵完成出餐
- **訂單明細**：日 / 月切換，查看歷史訂單
- **CSV 匯出**：依日期範圍匯出訂單，含 UTF-8 BOM（Excel 可直接開啟）
- **統計數據**：訂單數、營業額、平均客單價、品項銷售排行
- **菜單管理**：新增 / 編輯 / 下架品項，支援規格選項
- **菜單排序**：↑ ↓ 調整品項順序，分類整體排序，儲存至 Firestore
- **店家設定**：店名、副標題、地址、電話、營業時間、公休說明
- **Logo URL**：貼上外部圖片連結設定 Logo（免 Firebase Storage）
- **QR Code**：自動產生含店家資訊的名片，可列印
- **員工帳號管理**：owner 可新增 staff / manager，停用 / 啟用帳號
- **系統檢查**：一鍵驗證店家設定、菜單、帳號、PWA 狀態，warning 可點擊跳轉

### 帳號與權限

- **三層角色**：owner / manager / staff，各自看到不同 tab
- **Firestore Rules**：後端強制驗證角色與店家歸屬，前端隱藏為輔助

### PWA

- `manifest.webmanifest`：支援安裝到手機桌面
- `sw.js`：HTML network-first，靜態資源 stale-while-revalidate，Firestore / Auth bypass
- 圖示：icon-192.png / icon-512.png

### 基礎建設

- `app-config.js`：集中管理 baseUrl / defaultStoreId，換網域只改一處
- `scripts/setup-store.js`：一行指令初始化新店家（Auth + Firestore + 預設菜單）
- Firebase Hosting + Firestore + Auth（Spark 免費方案）

### 文件與交付

- `docs/OWNER_GUIDE.md`：老闆操作手冊
- `docs/STAFF_GUIDE.md`：員工操作手冊
- `docs/NEW_STORE_SETUP.md`：新店家建立流程（僅本機，不公開部署）
- `docs/DEPLOYMENT.md`：部署與維護說明（僅本機，不公開部署）
- Hosting ignore 清單補齊，service account key / 內部腳本 / operator 文件均排除

---

<!-- 新版本請在上方插入，格式：## vX.Y.Z — YYYY-MM-DD -->

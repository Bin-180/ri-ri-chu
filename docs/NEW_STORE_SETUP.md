# 新店家建立流程

本文件說明如何替新店家初始化系統，並完成上線前的必要設定。

---

## 前置需求

- 已安裝 Node.js（v16 以上）
- 已有 Firebase Admin SDK 金鑰（`ririchu-14b81-firebase-adminsdk-*.json`，放在專案根目錄）
- 已安裝依賴套件：在專案根目錄執行 `npm install`

> **重要**：Admin SDK 金鑰檔案已列入 `.gitignore`，**不可 commit 或上傳到任何地方**。

---

## 第一步：執行初始化腳本

在專案根目錄執行以下指令（將 `<>` 內容換成實際資料）：

```bash
node scripts/setup-store.js \
  --storeId          <英文店家代號，例如 newcafe>  \
  --storeName        <店名，例如 新咖啡>            \
  --ownerEmail       <老闆email，例如 owner@newcafe.com> \
  --ownerPassword    <初始密碼，至少6碼>            \
  --ownerDisplayName <老闆顯示名稱，例如 新咖啡老闆> \
  --subtitle         <副標題，例如 早午餐・輕食>    \
  --address          <地址>                         \
  --phone            <電話>                         \
  --hours            <營業時間，例如 07:00 – 14:00> \
  --closedDay        <公休說明，例如 週一公休>
```

### 必要參數說明

| 參數 | 說明 | 注意事項 |
|------|------|---------|
| `--storeId` | 店家唯一代號 | **只能用英文小寫與數字**，建立後不可更改，例如 `newcafe`、`breakfast01` |
| `--storeName` | 店名 | 顯示在前台與 QR Code，可包含中文 |
| `--ownerEmail` | 老闆登入 Email | 將成為 owner 帳號的登入帳號 |
| `--ownerPassword` | 老闆初始密碼 | 至少 6 個字元 |
| `--ownerDisplayName` | 老闆顯示名稱 | 顯示在後台，不對外公開 |

### 選填參數

| 參數 | 說明 |
|------|------|
| `--subtitle` | 副標題，顯示在店名下方 |
| `--address` | 地址，顯示在 QR Code 名片 |
| `--phone` | 電話，顯示在 QR Code 名片 |
| `--hours` | 營業時間，顯示在 QR Code 名片 |
| `--closedDay` | 公休說明，顯示在 QR Code 名片 |
| `--force` | 若 storeId 已存在，強制覆蓋（危險，謹慎使用） |

### 腳本執行結果

成功後會顯示：

```
✔  建立 owner 帳號：owner@newcafe.com (uid: xxxxxxxx)
✔  stores/newcafe 寫入完成
✔  users/{uid} 寫入完成 (role: owner)
✔  stores/newcafe/menu 寫入完成（100 筆）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
新店家初始化完成
  storeId    : newcafe
  storeName  : 新咖啡
  owner      : owner@newcafe.com
  ownerUid   : xxxxxxxx
  menu items : 100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

腳本會自動：
- 建立 owner 的 Firebase Auth 帳號
- 建立 `stores/{storeId}` 文件（店家基本資料）
- 建立 `users/{ownerUid}` 文件（帳號角色設定）
- 複製預設菜單到 `stores/{storeId}/menu`（含 sortOrder）

---

## 第二步：老闆登入後台完成設定

腳本執行完畢後，請讓老闆登入後台完成以下設定。

### 後台網址

```
https://ririchu-14b81.web.app/admin.html
```

前台點餐網址（提供給顧客或印在 QR Code 上）：

```
https://ririchu-14b81.web.app/?store=<storeId>
```

### 2-1. 店家設定

1. 登入後台，切換到「店家設定」tab
2. 確認或修改：店名、副標題、地址、電話、營業時間、公休說明
3. 按「儲存設定」

### 2-2. Logo 設定

1. 將 Logo 圖片上傳到可公開存取的圖床（Imgur / Cloudinary / Google 相簿公開連結等）
2. 複製圖片直接連結（結尾通常是 `.jpg` 或 `.png`）
3. 在「店家設定」頁面找到「Logo 網址」欄位，貼上連結
4. 按「儲存設定」
5. 前台頁首圖片即會更新

> 若暫時沒有 Logo 也沒關係，可之後再補。

### 2-3. 菜單確認

預設菜單已自動匯入，請老闆確認：

1. 切換到「菜單管理」tab
2. 確認品項分類與名稱符合實際菜單
3. 需要修改的品項按鉛筆圖示編輯
4. 不需要的品項按下架開關（可隨時恢復）
5. 新增本店專屬品項（按「＋ 新增品項」）
6. 切換到「排序」模式調整品項顯示順序

### 2-4. QR Code 確認與列印

1. 切換到「QR Code」tab
2. 確認名片上顯示的店名、地址、電話、營業時間是否正確
3. 掃描 QR Code 測試是否能正確開啟點餐頁面
4. 按「列印 QR Code」列印供擺放桌上或張貼

### 2-5. 系統檢查

1. 切換到「系統檢查」tab
2. 確認所有項目顯示 ✅ 通過，或警告（⚠️）均已確認可接受
3. 若有 ❌ 錯誤，點擊項目名稱跳到對應設定頁修正

---

## 第三步：測試前台送單流程

1. 用手機或電腦開啟點餐網址（或掃描 QR Code）
2. 選擇品項加入購物車
3. 填寫桌號（內用）或姓名+電話（外帶）
4. 按「送出訂單」
5. 確認後台「收單」頁面出現這筆訂單

## 第四步：測試後台收單流程

1. 在後台「收單」頁面確認訂單資訊正確
2. 按「✓ 完成出餐」
3. 確認訂單從收單頁消失
4. 切換到「訂單明細」確認訂單有被記錄

---

## 完成

以上步驟完成後，店家即可正式使用。

若需要建立員工帳號，請老闆至後台「員工帳號」tab 自行新增（詳見 [OWNER_GUIDE.md](OWNER_GUIDE.md)）。

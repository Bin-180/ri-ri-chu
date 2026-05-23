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

## 暫停接單

- [ ] **manager 可切換暫停接單**
  - 以 manager 帳號登入 → 收單 tab → 確認出現「接單狀態」控制面板
  - 點「暫停接單」→ 確認前台出現橘色暫停橫幅，「送出訂單」按鈕變灰無法點按
  - 點「恢復接單」→ 確認前台橫幅消失，按鈕恢復正常

- [ ] **staff 看不到暫停接單控制**
  - 以 staff 帳號登入 → 確認收單 tab 不顯示接單狀態面板

- [ ] **owner 可設定暫停訊息**
  - 以 owner 登入 → 暫停接單後在訊息欄填寫自訂文字 → 儲存
  - 確認前台顯示自訂文字（而非預設「目前暫停接單」）

- [ ] **系統檢查顯示接單狀態**
  - 暫停接單時，系統檢查 tab 的「接單狀態」項目顯示 ⚠️ 警告
  - 恢復接單後重新檢查，顯示 ✅

---

## 缺貨快速切換

- [ ] **manager 可展開缺貨管理**
  - 以 manager 帳號登入 → 收單 tab → 確認有「缺貨管理」區塊
  - 點「展開」確認品項清單依分類顯示

- [ ] **切換缺貨後前台即時消失**
  - 點任一品項的「缺貨」按鈕 → 前台重新整理後確認該品項不顯示
  - 點「供應中」恢復 → 前台確認品項重新出現

- [ ] **staff 看不到缺貨管理**
  - 以 staff 帳號登入 → 確認收單 tab 沒有缺貨管理區塊

---

## 訂單列印

- [ ] **即時訂單可列印**
  - 前台送一筆訂單後，後台收單卡片出現「列印」按鈕
  - 點「列印」→ 新視窗開啟，收據顯示：店名、訂單號、時間、品項、金額
  - 確認「完成出餐」按鈕未受影響，仍可正常點按

- [ ] **歷史訂單可列印**
  - 訂單明細 tab → 選日期 → 確認每筆訂單旁有「列印」按鈕
  - 點列印後收據內容正確

- [ ] **外帶訂單列印顯示電話與取餐時間**
  - 送一筆外帶訂單（填電話與取餐時間）
  - 列印後確認收據出現電話與取餐時間兩列

- [ ] **備註出現在收據**
  - 送出含備註的訂單，列印後確認備註顯示在收據底部

---

## 法律頁面

- [ ] **legal.html 可開啟**
  - 執行：`curl -I https://ririchu-14b81.web.app/legal.html?store=ririchu`
  - 確認 HTTP 200

- [ ] **legal.html 帶入店名**
  - 開啟 `https://ririchu-14b81.web.app/legal.html?store=ririchu`
  - 確認頁面標題、內文的「本店」已替換為正確店名

- [ ] **#privacy / #terms 錨點正常**
  - 開啟 `...legal.html?store=ririchu#privacy` 確認跳到隱私權政策段落
  - 開啟 `...legal.html?store=ririchu#terms` 確認跳到服務條款段落

- [ ] **找不到 store 時顯示預設文字**
  - 開啟 `legal.html?store=nonexistent`
  - 確認頁面正常顯示，「本店」未被替換，聯絡方式顯示「請向店家現場確認聯絡方式」

- [ ] **noindex 設定**
  - 執行：`curl -s https://ririchu-14b81.web.app/legal.html | grep noindex`
  - 確認輸出包含 `noindex`

- [ ] **前台 drawer 顯示法律連結**
  - 開啟前台 `/?store=ririchu` → 點「查看訂單」開啟訂單 drawer
  - 確認「送出訂單」按鈕上方出現「隱私權政策與服務條款」連結小字
  - 點連結，確認新分頁開啟 `legal.html?store=ririchu`

---

## 最終確認

- [ ] 以上所有項目均已確認 ✅
- [ ] 交付給店家的網址已確認可用
- [ ] 老闆帳號密碼已安全傳達（不透過公開管道）
- [ ] 員工帳號已依需求建立

**簽核：___________　日期：___________**

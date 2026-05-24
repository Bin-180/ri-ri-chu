// 前台 store loader
// 1. 從 URL ?store=xxx 讀取 storeId（fallback STORE_CONFIG.storeId）
// 2. 設定 activeStoreId
// 3. 從 Firestore stores/{storeId} 讀取店家資料，覆蓋 STORE_CONFIG
// 4. 失敗時設定 storeLoadError，阻止訂單寫入

let storeLoaded    = false;
let storeLoadError = null;

const storeReady = (async function () {
  const params  = new URLSearchParams(window.location.search);
  const storeId = params.get("store") || STORE_CONFIG.storeId;

  setActiveStoreId(storeId);

  try {
    const snap = await db.collection("stores").doc(storeId).get();
    if (!snap.exists) {
      storeLoadError = "找不到店家「" + storeId + "」，請確認點餐連結是否正確。";
      return;
    }
    const d = snap.data();
    STORE_CONFIG.storeId = storeId;
    if (d.storeName) STORE_CONFIG.storeName = d.storeName;
    if (d.subtitle)  STORE_CONFIG.subtitle  = d.subtitle;
    if (d.address)   STORE_CONFIG.address   = d.address;
    if (d.phone)     STORE_CONFIG.phone     = d.phone;
    if (d.hours)     STORE_CONFIG.hours     = d.hours;
    if (d.closedDay) STORE_CONFIG.closedDay = d.closedDay;
    if ("logo" in d)     STORE_CONFIG.logo          = d.logo || "";
    if (d.theme)         STORE_CONFIG.theme         = d.theme;
    if (d.layout)        STORE_CONFIG.layout        = d.layout;
    if (d.categoryOrder) STORE_CONFIG.categoryOrder = d.categoryOrder;
    STORE_CONFIG.acceptingOrders = d.acceptingOrders !== false;
    STORE_CONFIG.pauseMessage    = d.pauseMessage    || "";
    storeLoaded = true;
  } catch (err) {
    storeLoadError = err.message || "載入店家設定失敗，請稍後再試。";
  }
})();

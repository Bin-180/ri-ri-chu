// 多店家 Firestore 路徑 helper
// 前台：activeStoreId 由 store-loader.js 從 URL ?store= 讀取後設定
// 後台：activeStoreId 由登入後 users/{uid}.storeId 設定
// 未設定時拋錯，不允許 fallback 寫入預設店家

let activeStoreId = null;

function setActiveStoreId(storeId) {
  activeStoreId = storeId;
}

function getStoreId() {
  if (!activeStoreId) throw new Error("店家 ID 未設定，請確認網址包含 ?store=xxx");
  return activeStoreId;
}

function storeDoc() {
  return db.collection("stores").doc(getStoreId());
}

function menuCollection() {
  return storeDoc().collection("menu");
}

function ordersCollection() {
  return storeDoc().collection("orders");
}

function pendingOrdersCollection() {
  return storeDoc().collection("pendingOrders");
}

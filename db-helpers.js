// 多店家 Firestore 路徑 helper
// activeStoreId 由登入後 users/{uid}.storeId 決定；STORE_CONFIG.storeId 只作 fallback

let activeStoreId = null;

function setActiveStoreId(storeId) {
  activeStoreId = storeId;
}

function getStoreId() {
  return activeStoreId || STORE_CONFIG.storeId;
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

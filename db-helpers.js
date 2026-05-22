// 多店家 Firestore 路徑 helper
// 所有 db.collection 呼叫都透過這裡，未來切換店家只需改 STORE_CONFIG.storeId

function getStoreId() {
  return STORE_CONFIG.storeId;
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

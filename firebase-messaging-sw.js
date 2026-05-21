// Service Worker — 接收主頁面 postMessage 並顯示系統通知
self.addEventListener("message", (event) => {
  if (event.data?.type !== "NEW_ORDER") return;

  const count = event.data.count || 1;
  const body  = count > 1 ? `目前共有 ${count} 筆待處理訂單` : "有新的訂單進來了！";

  self.registration.showNotification("🔔 日日初 — 新訂單", {
    body,
    icon:             "./logo.jpg",
    badge:            "./logo.jpg",
    tag:              "new-order",   // 同 tag 的通知會合併覆蓋，不會堆疊
    requireInteraction: true,        // 通知不自動消失，要手動關閉
    vibrate:          [300, 150, 300, 150, 600],
    data:             { url: self.location.href },
  });
});

// 點通知 → 將後台的管理頁分頁帶到前景
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes("admin") && "focus" in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow(event.notification.data?.url || "./admin.html");
    })
  );
});

self.addEventListener("install", e => {
  console.log("Service Worker cài đặt");
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  console.log("Service Worker kích hoạt");
});

self.addEventListener("push", e => {
  const data = e.data?.text() || "Bạn có thông báo mới!";
  e.waitUntil(
    self.registration.showNotification("Lịch học", {
      body: data,
      icon: "icon.png"
    })
  );
});

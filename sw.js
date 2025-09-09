self.addEventListener("install", e=>{
  console.log("Service Worker cài xong");
  self.skipWaiting();
});
self.addEventListener("activate", e=>{
  console.log("Service Worker chạy");
});

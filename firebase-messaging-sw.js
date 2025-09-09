// Service Worker cho FCM
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBlch-Era9QH3uXMTquGZCjcGIYQ4TqbZ4",
  authDomain: "lich-hoc-c04a1.firebaseapp.com",
  projectId: "lich-hoc-c04a1",
  storageBucket: "lich-hoc-c04a1.firebasestorage.app",
  messagingSenderId: "236521478243",
  appId: "1:236521478243:web:e4412ffd46b42dff664056",
  measurementId: "G-WK9L0YCSQJ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Nhận thông báo background:", payload);
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "https://cdn-icons-png.flaticon.com/512/1827/1827349.png"
    }
  );
});

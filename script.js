// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBlch-Era9QH3uXMTquGZCjcGIYQ4TqbZ4",
  authDomain: "lich-hoc-c04a1.firebaseapp.com",
  projectId: "lich-hoc-c04a1",
  storageBucket: "lich-hoc-c04a1.firebasestorage.app",
  messagingSenderId: "236521478243",
  appId: "1:236521478243:web:e4412ffd46b42dff664056",
  measurementId: "G-WK9L0YCSQJ"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Đăng ký service worker để nhận push
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("firebase-messaging-sw.js")
    .then(reg => console.log("Service Worker đã đăng ký:", reg))
    .catch(err => console.error("SW error:", err));
}

// Request quyền nhận thông báo
async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BPq8rUJ3zkV-ocGxdL-NLZEUw4RMt9fAsCu-ru4K0D_UDd5mStKfo50IVmVbCeTBs8CpceTpSFr2bMMU3aF3shk"
    });
    console.log("FCM Token:", token);
    alert("FCM Token (copy log trong console):\n" + token);
  } else {
    alert("Bạn chưa cho phép thông báo.");
  }
}

// Test thông báo
document.getElementById("testNotify").addEventListener("click", async () => {
  await requestPermission();
  new Notification("🔔 Nhắc nhở", {
    body: "Đây là thông báo test từ web app lịch học",
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827349.png"
  });
});

// Nhận thông báo foreground
onMessage(messaging, (payload) => {
  console.log("Thông báo foreground:", payload);
  alert("FCM: " + payload.notification.title + "\n" + payload.notification.body);
});

/* ===============================
   PHẦN HIỂN THỊ LỊCH
================================*/
const schedules = {
  "0": [
    ["22h30 - 2h00", "Ngủ chính - Giấc ngủ quan trọng nhất"],
    ["2h00 - 3h30", "Toán - Tập trung cao độ"],
    ["3h30 - 4h15", "Tin - Thực hành bài tập"],
    ["4h15 - 5h00", "Anh - Từ vựng và ngữ pháp"],
    ["5h00 - 5h30", "Ăn nhẹ, thư giãn"],
    ["5h30 - 6h00", "Vệ sinh, chuẩn bị"],
    ["6h00 - 11h30", "Đi học buổi sáng"],
    ["11h30 - 13h30", "Ăn trưa + Ngủ"],
    ["13h30 - 14h00", "Chuẩn bị buổi chiều"],
    ["14h00 - 16h35", "Đi học buổi chiều"],
    ["16h35 - 17h30", "Về nhà, thư giãn"],
    ["17h30 - 19h30", "Ăn tối + Nghỉ ngơi"],
    ["19h30 - 20h30", "Làm bài tập trên lớp"],
    ["20h30 - 21h30", "Toán - Luyện tập"],
    ["21h30 - 22h30", "Anh - Luyện nghe & ngữ pháp"]
  ],
  "1": [
    ["22h30 - 2h00", "Ngủ chính"],
    ["2h00 - 3h30", "Toán"],
    ["3h30 - 4h15", "Anh"],
    ["4h15 - 5h00", "Môn phụ"],
    ["5h00 - 5h30", "Ăn nhẹ"],
    ["5h30 - 6h00", "Vệ sinh, chuẩn bị"],
    ["6h00 - 11h30", "Đi học buổi sáng"],
    ["11h30 - 13h30", "Ăn trưa + Ngủ"],
    ["13h30 - 14h00", "Chuẩn bị buổi chiều"],
    ["14h00 - 16h35", "Đi học buổi chiều"],
    ["16h35 - 17h30", "Chuẩn bị đi học thêm"],
    ["17h30 - 19h30", "Học thêm Toán"],
    ["19h30 - 20h30", "Về nhà, ăn tối muộn"],
    ["20h30 - 21h30", "Toán - Ôn luyện"],
    ["21h30 - 22h30", "Anh - Ngữ pháp, nghe"]
  ],
  "6": [
    ["22h30 - 2h00", "Ngủ chính"],
    ["2h00 - 3h30", "Tin - Thực hành"],
    ["3h30 - 4h15", "Anh - Từ vựng"],
    ["4h15 - 5h00", "Toán - Bài tập"],
    ["5h00 - 5h30", "Ăn nhẹ"],
    ["5h30 - 6h00", "Vệ sinh cá nhân"],
    ["6h00 - 11h30", "Tự học môn phụ / Nghỉ"],
    ["11h30 - 13h30", "Ăn trưa + Ngủ"],
    ["13h30 - 14h00", "Thư giãn"],
    ["14h00 - 16h35", "Làm bài tập cuối tuần"],
    ["16h35 - 17h30", "Nghỉ ngơi"],
    ["17h30 - 19h30", "Ăn tối + Nghỉ ngơi"],
    ["19h30 - 20h30", "Ôn tập tổng hợp"],
    ["20h30 - 21h30", "Toán - Luyện đề"],
    ["21h30 - 22h30", "Ôn nhẹ tất cả môn"]
  ]
};

// Hiển thị lịch
function showSchedule(day) {
  const body = document.getElementById("scheduleBody");
  body.innerHTML = "";
  const todaySchedule = schedules[day];
  if (!todaySchedule) return;
  todaySchedule.forEach(([time, activity]) => {
    const row = `<tr><td>${time}</td><td>${activity}</td></tr>`;
    body.innerHTML += row;
  });
}

// Đồng hồ
function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").textContent = 
    now.toLocaleDateString("vi-VN") + " " + now.toLocaleTimeString("vi-VN");
}

// Tính tổng giờ học/ngủ
function calculateStats() {
  document.getElementById("stats").innerHTML = `
    Tổng học: ~8.5h/ngày<br>
    Tổng ngủ: ~3.5h/ngày<br>
    Tự học: ~6.5h/ngày
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  showSchedule(0);
  calculateStats();
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

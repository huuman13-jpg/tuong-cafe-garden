/**
 * admin/js/data.js – Dùng chung Firebase với trang chủ
 * Copy đúng firebaseConfig từ file js/data.js ở trang chủ
 */

var firebaseConfig = {
  apiKey: "AIzaSyDwIx2502_5meBzVr_BFinbkxpm2Vpv0x4",
  authDomain: "tuong-cafe-garden.firebaseapp.com",
  databaseURL: "https://tuong-cafe-garden-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tuong-cafe-garden",
  storageBucket: "tuong-cafe-garden.firebasedatabase.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

var categoryLabels = {
  'phong-thuy': 'Cây phong thủy',
  'de-ban': 'Cây để bàn',
  'sen-da': 'Sen đá / Xương rồng',
  'dai-sanh': 'Cây đại sảnh'
};

var categoryBadgeColors = {
  'phong-thuy': 'bg-forest text-white',
  'de-ban': 'bg-moss text-white',
  'sen-da': 'bg-lime text-forest-dark',
  'dai-sanh': 'bg-terra text-white'
};

var DEFAULT_PLANTS = [
  { id: 1, name: 'Cây Kim Tiền', category: 'phong-thuy', price: 350000, contactPrice: false, light: 'Ít ánh sáng', water: '7-10 ngày/lần', description: 'Cây phong thủy được ưa chuộng nhất.', fengShui: 'Tài lộc, phú quý', position: 'Phòng khách', status: 'còn-hàng', images: ['https://picsum.photos/seed/kimtien1/400/400.jpg','https://picsum.photos/seed/kimtien2/400/400.jpg'], createdAt: '2025-01-15' },
  { id: 2, name: 'Lưỡi Hổ Mini', category: 'de-ban', price: 120000, contactPrice: false, light: 'Nắng nhẹ', water: '10-14 ngày/lần', description: 'Thanh lọc không khí tốt.', fengShui: 'Xua đuổi tà khí', position: 'Bàn làm việc', status: 'còn-hàng', images: ['https://picsum.photos/seed/luoiho1/400/400.jpg'], createdAt: '2025-01-14' },
  { id: 3, name: 'Sen Đá Hồng', category: 'sen-da', price: 85000, contactPrice: false, light: 'Nắng trực tiếp', water: '14-20 ngày/lần', description: 'Đẹp dịu dàng, màu hồng pastel.', fengShui: 'Tình yêu, bình yên', position: 'Ban công', status: 'còn-hàng', images: ['https://picsum.photos/seed/sendahong1/400/400.jpg','https://picsum.photos/seed/sendahong2/400/400.jpg'], createdAt: '2025-01-13' },
  { id: 4, name: 'Cau Vàng', category: 'dai-sanh', price: 0, contactPrice: true, light: 'Ánh sáng gián tiếp', water: '2-3 lần/tuần', description: 'Thân mảnh khảnh, lá xòe.', fengShui: 'Sinh lời, phát đạt', position: 'Sảnh lớn', status: 'còn-hàng', images: ['https://picsum.photos/seed/cauvang1/400/400.jpg'], createdAt: '2025-01-12' },
  { id: 5, name: 'Phát Lộc', category: 'phong-thuy', price: 280000, contactPrice: false, light: 'Bóng râm', water: '2 lần/tuần', description: 'Lá đa sắc màu.', fengShui: 'Phát triển, thịnh vượng', position: 'Phòng khách', status: 'hết-hàng', images: ['https://picsum.photos/seed/phatloc1/400/400.jpg'], createdAt: '2025-01-11' },
  { id: 6, name: 'Xương Rồng Tròn', category: 'sen-da', price: 65000, contactPrice: false, light: 'Nắng trực tiếp 6h+', water: '20-30 ngày/lần', description: 'Dáng dễ thương.', fengShui: 'Mạnh mẽ, vượt khó', position: 'Ban công', status: 'còn-hàng', images: ['https://picsum.photos/seed/xuongrong1/400/400.jpg'], createdAt: '2025-01-10' },
  { id: 7, name: 'Trầu Bà Thanh Xuân', category: 'de-ban', price: 95000, contactPrice: false, light: 'Ít sáng', water: 'Đổi nước 1 tuần/lần', description: 'Dây leo mềm mại.', fengShui: 'Thanh xuân, sức sống', position: 'Bàn làm việc', status: 'ẩn', images: ['https://picsum.photos/seed/trauba1/400/400.jpg'], createdAt: '2025-01-09' },
  { id: 8, name: 'Cây Lá Đỏ', category: 'dai-sanh', price: 0, contactPrice: true, light: 'Nắng nhẹ', water: '2-3 lần/tuần', description: 'Lá đỏ tía nổi bật.', fengShui: 'Sức mạnh, quyền uy', position: 'Sảnh, quán cafe', status: 'còn-hàng', images: ['https://picsum.photos/seed/lado1/400/400.jpg'], createdAt: '2025-01-08' }
];

let nextId = 9;
let libraryImages = [
  'https://picsum.photos/seed/lib1/300/300.jpg',
  'https://picsum.photos/seed/lib2/300/300.jpg',
  'https://picsum.photos/seed/lib3/300/300.jpg',
  'https://picsum.photos/seed/lib4/300/300.jpg',
  'https://picsum.photos/seed/lib5/300/300.jpg',
  'https://picsum.photos/seed/lib6/300/300.jpg'
];
let uploadedImages = [];

/* ---------- Firebase (giống trang chủ) ---------- */
var FIREBASE_DB = null;
var plantsCache = null;
var isFirebaseReady = false;
var pendingLoads = [];

(function initFirebase() {
  var s = document.createElement('script');
  s.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  s.onload = function () {
    var s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
    s2.onload = function () {
      firebase.initializeApp(firebaseConfig);
      FIREBASE_DB = firebase.database();
      isFirebaseReady = true;
      for (var i = 0; i < pendingLoads.length; i++) pendingLoads[i]();
      pendingLoads = [];
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s);
})();

function loadPlants(callback) {
  if (typeof callback === 'undefined') {
    return new Promise(function (resolve) { _doLoad(resolve); });
  }
  _doLoad(callback);
}

function _doLoad(callback) {
  if (plantsCache) { callback(JSON.parse(JSON.stringify(plantsCache))); return; }

  function tryLoad() {
    if (!isFirebaseReady) { pendingLoads.push(function () { tryLoad(); }); return; }
    FIREBASE_DB.ref('plants').once('value').then(function (snap) {
      var d = snap.val();
      if (d && Array.isArray(d) && d.length > 0) {
        plantsCache = d;
      } else {
        plantsCache = JSON.parse(JSON.stringify(DEFAULT_PLANTS));
        FIREBASE_DB.ref('plants').set(plantsCache);
      }
      callback(JSON.parse(JSON.stringify(plantsCache)));
    }).catch(function () {
      try {
        var s = localStorage.getItem('tuongCafePlants');
        if (s) { plantsCache = JSON.parse(s); callback(JSON.parse(JSON.stringify(plantsCache))); return; }
      } catch (e) {}
      plantsCache = JSON.parse(JSON.stringify(DEFAULT_PLANTS));
      callback(JSON.parse(JSON.stringify(plantsCache)));
    });
  }
  tryLoad();
}

function savePlants(arr) {
  plantsCache = arr;
  try { localStorage.setItem('tuongCafePlants', JSON.stringify(arr)); } catch (e) {}
  if (isFirebaseReady && FIREBASE_DB) {
    FIREBASE_DB.ref('plants').set(arr).catch(function () {});
  }
}
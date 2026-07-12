/**
 * data.js – Dữ liệu cây cảnh + Firebase đồng bộ
 * Dùng chung cho trang chủ & admin qua GitHub Pages
 */

/* =====================================================
   ⬇️ DÁN ĐOẠN firebaseConfig CỦA ANH VÀO ĐÂY ⬇️
   ===================================================== */
var firebaseConfig = {
    apiKey: "AIzaSyDwIx2502_5meBzVr_BFinbkxpm2Vpv0x4",
  authDomain: "tuong-cafe-garden.firebaseapp.com",
  databaseURL: "https://tuong-cafe-garden-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tuong-cafe-garden",
  storageBucket: "tuong-cafe-garden.firebasestorage.app",
  messagingSenderId: "385194169377",
  appId: "1:385194169377:web:0c5207ea20ba7ec0e47f60",
  measurementId: "G-MRKR3W0ZHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/* =====================================================
   ⬆️ KẾT THÚC DÁN firebaseConfig ⬆️
   ===================================================== */

/* ---------- Hằng số ---------- */
var CATEGORY_LABELS = {
  'phong-thuy': 'Cây phong thủy',
  'de-ban': 'Cây để bàn',
  'sen-da': 'Sen đá / Xương rồng',
  'dai-sanh': 'Cây đại sảnh'
};

var CATEGORY_BADGE_COLORS = {
  'phong-thuy': 'bg-forest text-white',
  'de-ban': 'bg-moss text-white',
  'sen-da': 'bg-lime text-forest-dark',
  'dai-sanh': 'bg-terra text-white'
};

var CATEGORY_BADGE_TEXT = {
  'phong-thuy': 'Phong thủy',
  'de-ban': 'Để bàn',
  'sen-da': 'Sen đá',
  'dai-sanh': 'Đại sảnh'
};

/* ---------- Dữ liệu mặc định ---------- */
var DEFAULT_PLANTS = [
  {
    id: 1, name: 'Cây Kim Tiền', sciName: 'Zamioculcas zamiifolia',
    category: 'phong-thuy', price: 350000, contactPrice: false,
    light: 'Ít ánh sáng, chịu bóng râm tốt', water: '7-10 ngày tưới 1 lần',
    description: 'Cây Kim Tiền là một trong những loại cây phong thủy được ưa chuộng nhất. Thân mọng nước, lá xanh bóng có sức sống mãnh liệt.',
    fengShui: 'Tài lộc, phú quý, sinh khí tốt',
    position: 'Phòng khách, quầy lễ tân, góc phòng làm việc',
    status: 'còn-hàng',
    images: [
      'https://picsum.photos/seed/kimtien1/600/600.jpg',
      'https://picsum.photos/seed/kimtien2/600/600.jpg',
      'https://picsum.photos/seed/kimtien3/600/600.jpg',
      'https://picsum.photos/seed/kimtien4/600/600.jpg'
    ]
  },
  {
    id: 2, name: 'Lưỡi Hổ Mini', sciName: 'Sansevieria trifasciata',
    category: 'de-ban', price: 120000, contactPrice: false,
    light: 'Nắng nhẹ đến bóng râm', water: '10-14 ngày tưới 1 lần',
    description: 'Lưỡi Hổ Mini là phiên bản nhỏ gọn. Thanh lọc không khí xuất sắc, giúp tăng focus và giảm stress.',
    fengShui: 'Xua đuổi tà khí, bảo vệ gia chủ',
    position: 'Bàn làm việc, kệ sách, phòng ngủ',
    status: 'còn-hàng',
    images: [
      'https://picsum.photos/seed/luoiho1/600/600.jpg',
      'https://picsum.photos/seed/luoiho2/600/600.jpg',
      'https://picsum.photos/seed/luoiho3/600/600.jpg',
      'https://picsum.photos/seed/luoiho4/600/600.jpg'
    ]
  },
  {
    id: 3, name: 'Sen Đá Hồng', sciName: 'Echeveria lauii',
    category: 'sen-da', price: 85000, contactPrice: false,
    light: 'Nắng sáng trực tiếp 4-6 tiếng', water: '14-20 ngày tưới 1 lần',
    description: 'Sen Đá Hồng với lá thịt mọng màu hồng pastel. Khi thiếu nắng lá chuyển xanh, thêm nắng lên màu hồng rực.',
    fengShui: 'Tình yêu, sự dịu dàng, bình yên',
    position: 'Ban công, cửa sổ, kệ trưng bày',
    status: 'còn-hàng',
    images: [
      'https://picsum.photos/seed/sendahong1/600/600.jpg',
      'https://picsum.photos/seed/sendahong2/600/600.jpg',
      'https://picsum.photos/seed/sendahong3/600/600.jpg',
      'https://picsum.photos/seed/sendahong4/600/600.jpg'
    ]
  },
  {
    id: 4, name: 'Cau Vàng', sciName: 'Dypsis lutescens',
    category: 'dai-sanh', price: 0, contactPrice: true,
    light: 'Ánh sáng gián tiếp', water: '2-3 lần/tuần',
    description: 'Thân mảnh khảnh vàng óng, lá xòe như bàn tay. Lựa chọn hàng đầu cho đại sảnh, lobby.',
    fengShui: 'Sinh lời, phát đạt, vượng khí',
    position: 'Sảnh lớn, khách sạn, nhà hàng, resort',
    status: 'còn-hàng',
    images: [
      'https://picsum.photos/seed/cauvang1/600/600.jpg',
      'https://picsum.photos/seed/cauvang2/600/600.jpg',
      'https://picsum.photos/seed/cauvang3/600/600.jpg',
      'https://picsum.photos/seed/cauvang4/600/600.jpg'
    ]
  },
  {
    id: 5, name: 'Phát Lộc', sciName: 'Aglaonema commutatum',
    category: 'phong-thuy', price: 280000, contactPrice: false,
    light: 'Bóng râm đến ánh sáng nhẹ', water: '2 lần/tuần',
    description: 'Lá đa sắc: xanh, đỏ, hồng, bạc hòa quyện. Tên gọi đã nói lên ý nghĩa.',
    fengShui: 'Phát triển, thịnh vượng, may mắn',
    position: 'Phòng khách, phòng làm việc, hành lang',
    status: 'hết-hàng',
    images: [
      'https://picsum.photos/seed/phatloc1/600/600.jpg',
      'https://picsum.photos/seed/phatloc2/600/600.jpg',
      'https://picsum.photos/seed/phatloc3/600/600.jpg',
      'https://picsum.photos/seed/phatloc4/600/600.jpg'
    ]
  },
  {
    id: 6, name: 'Xương Rồng Tròn', sciName: 'Mammillaria hahniana',
    category: 'sen-da', price: 65000, contactPrice: false,
    light: 'Nắng trực tiếp 6+ tiếng', water: '20-30 ngày tưới 1 lần',
    description: 'Thân tròn phủ lông trắng mềm, mùa xuân nở hoa tím nhạt. Cực kỳ dễ sống.',
    fengShui: 'Bảo vệ, mạnh mẽ, vượt khó',
    position: 'Ban công, sân thượng, kệ gần cửa sổ',
    status: 'còn-hàng',
    images: [
      'https://picsum.photos/seed/xuongrong1/600/600.jpg',
      'https://picsum.photos/seed/xuongrong2/600/600.jpg',
      'https://picsum.photos/seed/xuongrong3/600/600.jpg',
      'https://picsum.photos/seed/xuongrong4/600/600.jpg'
    ]
  },
  {
    id: 7, name: 'Trầu Bà Thanh Xuân', sciName: 'Epipremnum aureum',
    category: 'de-ban', price: 95000, contactPrice: false,
    light: 'Ít sáng đến trung bình', water: 'Đổi nước 1 tuần/lần',
    description: 'Lá xanh bóng có vệt vàng thanh lịch. Trồng thủy canh đẹp. NASA xếp hàng đầu lọc không khí.',
    fengShui: 'Thanh xuân, sức sống, trường thọ',
    position: 'Bàn làm việc, kệ treo, nhà vệ sinh',
    status: 'ẩn',
    images: [
      'https://picsum.photos/seed/trauba1/600/600.jpg',
      'https://picsum.photos/seed/trauba2/600/600.jpg',
      'https://picsum.photos/seed/trauba3/600/600.jpg',
      'https://picsum.photos/seed/trauba4/600/600.jpg'
    ]
  },
  {
    id: 8, name: 'Cây Lá Đỏ (Cordyline)', sciName: 'Cordyline fruticosa',
    category: 'dai-sanh', price: 0, contactPrice: true,
    light: 'Nắng nhẹ, tránh nắng gắt', water: '2-3 lần/tuần',
    description: 'Cụm lá đỏ tía xếp như hoa sen. Tạo điểm nhấn mạnh mẽ cho không gian.',
    fengShui: 'Sức mạnh, quyền uy, nhiệt huyết',
    position: 'Sảnh, hành lang, góc decor quán cafe',
    status: 'còn-hàng',
    images: [
      'https://picsum.photos/seed/lado1/600/600.jpg',
      'https://picsum.photos/seed/lado2/600/600.jpg',
      'https://picsum.photos/seed/lado3/600/600.jpg',
      'https://picsum.photos/seed/lado4/600/600.jpg'
    ]
  }
];

/* ---------- Firebase kết nối ---------- */
var FIREBASE_DB = null;
var plantsCache = null;
var isFirebaseReady = false;
var pendingLoads = [];

/* Khởi tạo Firebase */
(function initFirebase() {
  var script = document.createElement('script');
  script.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  script.onload = function () {
    var script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
    script2.onload = function () {
      firebase.initializeApp(firebaseConfig);
      FIREBASE_DB = firebase.database();
      isFirebaseReady = true;

      /* Chạy các hàm đang chờ */
      for (var i = 0; i < pendingLoads.length; i++) {
        pendingLoads[i]();
      }
      pendingLoads = [];
    };
    document.head.appendChild(script2);
  };
  document.head.appendChild(script);
})();

/* ---------- Đọc dữ liệu ---------- */
function loadPlants(callback) {
  if (typeof callback === 'undefined') {
    /* Nếu không truyền callback → trả Promise (cho code cũ tương thích) */
    return new Promise(function (resolve) {
      _doLoad(resolve);
    });
  }
  _doLoad(callback);
}

function _doLoad(callback) {
  /* Nếu đã có cache → trả ngay */
  if (plantsCache) {
    callback(JSON.parse(JSON.stringify(plantsCache)));
    return;
  }

  function tryLoad() {
    if (!isFirebaseReady) {
      pendingLoads.push(function () { tryLoad(); });
      return;
    }

    FIREBASE_DB.ref('plants').once('value').then(function (snapshot) {
      var data = snapshot.val();
      if (data && Array.isArray(data) && data.length > 0) {
        plantsCache = data;
        callback(JSON.parse(JSON.stringify(plantsCache)));
      } else {
        /* Firebase trống → đẩy dữ liệu mặc định lên */
        plantsCache = JSON.parse(JSON.stringify(DEFAULT_PLANTS));
        FIREBASE_DB.ref('plants').set(plantsCache);
        callback(JSON.parse(JSON.stringify(plantsCache)));
      }
    }).catch(function () {
      /* Firebase lỗi → fallback localStorage → fallback default */
      try {
        var saved = localStorage.getItem('tuongCafePlants');
        if (saved) {
          plantsCache = JSON.parse(saved);
          callback(JSON.parse(JSON.stringify(plantsCache)));
          return;
        }
      } catch (e) {}
      plantsCache = JSON.parse(JSON.stringify(DEFAULT_PLANTS));
      callback(JSON.parse(JSON.stringify(plantsCache)));
    });
  }

  tryLoad();
}

/* ---------- Ghi dữ liệu ---------- */
function savePlants(plantsArray) {
  plantsCache = plantsArray;

  /* Luôn ghi localStorage làm backup */
  try {
    localStorage.setItem('tuongCafePlants', JSON.stringify(plantsArray));
  } catch (e) {}

  /* Ghi Firebase nếu đã sẵn sàng */
  if (isFirebaseReady && FIREBASE_DB) {
    FIREBASE_DB.ref('plants').set(plantsArray).catch(function () {
      /* Lỗi mạng → dữ liệu vẫn nằm trong localStorage */
    });
  }
}

/* ---------- Reset về mặc định ---------- */
function resetPlantsToDefault() {
  plantsCache = JSON.parse(JSON.stringify(DEFAULT_PLANTS));
  try { localStorage.removeItem('tuongCafePlants'); } catch (e) {}
  if (isFirebaseReady && FIREBASE_DB) {
    FIREBASE_DB.ref('plants').set(plantsCache);
  }
  return JSON.parse(JSON.stringify(plantsCache));
}
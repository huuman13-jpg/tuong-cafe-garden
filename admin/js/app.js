/**
 * data.js – Dữ liệu cho Admin
 * Admin ĐỌC/GHI cùng localStorage key với trang chủ
 */

var STORAGE_KEY = 'tuongCafePlants';

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

/* Dữ liệu mặc định (giống hệt trang chủ) */
var DEFAULT_PLANTS = [
  { id: 1, name: 'Cây Kim Tiền', category: 'phong-thuy', price: 350000, contactPrice: false, light: 'Ít ánh sáng, chịu bóng râm tốt', water: '7-10 ngày tưới 1 lần', description: 'Cây Kim Tiền là một trong những loại cây phong thủy được ưa chuộng nhất.', fengShui: 'Tài lộc, phú quý, sinh khí tốt', position: 'Phòng khách, quầy lễ tân', status: 'còn-hàng', images: ['https://picsum.photos/seed/kimtien1/400/400.jpg', 'https://picsum.photos/seed/kimtien2/400/400.jpg'], createdAt: '2025-01-15' },
  { id: 2, name: 'Lưỡi Hổ Mini', category: 'de-ban', price: 120000, contactPrice: false, light: 'Nắng nhẹ đến bóng râm', water: '10-14 ngày tưới 1 lần', description: 'Thanh lọc không khí tốt, dễ chăm sóc.', fengShui: 'Xua đuổi tà khí', position: 'Bàn làm việc, kệ sách', status: 'còn-hàng', images: ['https://picsum.photos/seed/luoiho1/400/400.jpg'], createdAt: '2025-01-14' },
  { id: 3, name: 'Sen Đá Hồng', category: 'sen-da', price: 85000, contactPrice: false, light: 'Nắng sáng trực tiếp 4-6 tiếng', water: '14-20 ngày tưới 1 lần', description: 'Đẹp dịu dàng, màu hồng pastel.', fengShui: 'Tình yêu, bình yên', position: 'Ban công, cửa sổ', status: 'còn-hàng', images: ['https://picsum.photos/seed/sendahong1/400/400.jpg', 'https://picsum.photos/seed/sendahong2/400/400.jpg'], createdAt: '2025-01-13' },
  { id: 4, name: 'Cau Vàng', category: 'dai-sanh', price: 0, contactPrice: true, light: 'Ánh sáng gián tiếp', water: '2-3 lần/tuần', description: 'Thân mảnh khảnh, lá xòe như bàn tay.', fengShui: 'Sinh lời, phát đạt', position: 'Sảnh lớn, khách sạn', status: 'còn-hàng', images: ['https://picsum.photos/seed/cauvang1/400/400.jpg'], createdAt: '2025-01-12' },
  { id: 5, name: 'Phát Lộc', category: 'phong-thuy', price: 280000, contactPrice: false, light: 'Bóng râm đến ánh sáng nhẹ', water: '2 lần/tuần', description: 'Lá đa sắc màu, mang ý nghĩa phát triển.', fengShui: 'Phát triển, thịnh vượng', position: 'Phòng khách, hành lang', status: 'hết-hàng', images: ['https://picsum.photos/seed/phatloc1/400/400.jpg'], createdAt: '2025-01-11' },
  { id: 6, name: 'Xương Rồng Tròn', category: 'sen-da', price: 65000, contactPrice: false, light: 'Nắng trực tiếp 6+ tiếng', water: '20-30 ngày tưới 1 lần', description: 'Dáng dễ thương, hoa tím nhạt.', fengShui: 'Mạnh mẽ, vượt khó', position: 'Ban công, sân thượng', status: 'còn-hàng', images: ['https://picsum.photos/seed/xuongrong1/400/400.jpg'], createdAt: '2025-01-10' },
  { id: 7, name: 'Trầu Bà Thanh Xuân', category: 'de-ban', price: 95000, contactPrice: false, light: 'Ít sáng đến trung bình', water: 'Đổi nước 1 tuần/lần', description: 'Dây leo mềm mại, trồng thủy canh đẹp.', fengShui: 'Thanh xuân, sức sống', position: 'Bàn làm việc, kệ treo', status: 'ẩn', images: ['https://picsum.photos/seed/trauba1/400/400.jpg'], createdAt: '2025-01-09' },
  { id: 8, name: 'Cây Lá Đỏ (Cordyline)', category: 'dai-sanh', price: 0, contactPrice: true, light: 'Nắng nhẹ, tránh nắng gắt', water: '2-3 lần/tuần', description: 'Lá đỏ tía nổi bật, tạo điểm nhấn.', fengShui: 'Sức mạnh, quyền uy', position: 'Sảnh, hành lang, quán cafe', status: 'còn-hàng', images: ['https://picsum.photos/seed/lado1/400/400.jpg'], createdAt: '2025-01-08' }
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

/* Đọc/ghi – DÙNG CÙNG KEY với trang chủ */
function loadPlants() {
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      var parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_PLANTS));
}

function savePlants(plantsArray) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plantsArray));
  } catch (e) {}
}
var DEFAULT_PLANTS = [
  { id:1, name:'Cây Kim Tiền', sciName:'Zamioculcas zamiifolia', category:'phong-thuy', price:350000, contactPrice:false, light:'Ít ánh sáng', water:'7-10 ngày/lần', description:'Cây phong thủy được ưa chuộng nhất. Thân mọng nước, lá xanh bóng.', fengShui:'Tài lộc, phú quý', position:'Phòng khách, quầy lễ tân', status:'còn-hàng', images:['https://picsum.photos/seed/kimtien1/600/600.jpg','https://picsum.photos/seed/kimtien2/600/600.jpg','https://picsum.photos/seed/kimtien3/600/600.jpg','https://picsum.photos/seed/kimtien4/600/600.jpg'] },
  { id:2, name:'Lưỡi Hổ Mini', sciName:'Sansevieria trifasciata', category:'de-ban', price:120000, contactPrice:false, light:'Nắng nhẹ đến bóng râm', water:'10-14 ngày/lần', description:'Thanh lọc không khí xuất sắc, giúp tăng focus.', fengShui:'Xua đuổi tà khí', position:'Bàn làm việc, kệ sách', status:'còn-hàng', images:['https://picsum.photos/seed/luoiho1/600/600.jpg','https://picsum.photos/seed/luoiho2/600/600.jpg','https://picsum.photos/seed/luoiho3/600/600.jpg','https://picsum.photos/seed/luoiho4/600/600.jpg'] },
  { id:3, name:'Sen Đá Hồng', sciName:'Echeveria lauii', category:'sen-da', price:85000, contactPrice:false, light:'Nắng trực tiếp 4-6 tiếng', water:'14-20 ngày/lần', description:'Lá thịt mọng màu hồng pastel. Thêm nắng lên màu hồng rực.', fengShui:'Tình yêu, bình yên', position:'Ban công, cửa sổ', status:'còn-hàng', images:['https://picsum.photos/seed/sendahong1/600/600.jpg','https://picsum.photos/seed/sendahong2/600/600.jpg','https://picsum.photos/seed/sendahong3/600/600.jpg','https://picsum.photos/seed/sendahong4/600/600.jpg'] },
  { id:4, name:'Cau Vàng', sciName:'Dypsis lutescens', category:'dai-sanh', price:0, contactPrice:true, light:'Ánh sáng gián tiếp', water:'2-3 lần/tuần', description:'Thân vàng óng, lá xòe như bàn tay. Sang trọng.', fengShui:'Sinh lời, phát đạt', position:'Sảnh lớn, khách sạn', status:'còn-hàng', images:['https://picsum.photos/seed/cauvang1/600/600.jpg','https://picsum.photos/seed/cauvang2/600/600.jpg','https://picsum.photos/seed/cauvang3/600/600.jpg','https://picsum.photos/seed/cauvang4/600/600.jpg'] },
  { id:5, name:'Phát Lộc', sciName:'Aglaonema commutatum', category:'phong-thuy', price:280000, contactPrice:false, light:'Bóng râm', water:'2 lần/tuần', description:'Lá đa sắc: xanh, đỏ, hồng, bạc.', fengShui:'Phát triển, thịnh vượng', position:'Phòng khách, hành lang', status:'hết-hàng', images:['https://picsum.photos/seed/phatloc1/600/600.jpg','https://picsum.photos/seed/phatloc2/600/600.jpg','https://picsum.photos/seed/phatloc3/600/600.jpg','https://picsum.photos/seed/phatloc4/600/600.jpg'] },
  { id:6, name:'Xương Rồng Tròn', sciName:'Mammillaria hahniana', category:'sen-da', price:65000, contactPrice:false, light:'Nắng trực tiếp 6h+', water:'20-30 ngày/lần', description:'Thân tròn phủ lông trắng, hoa tím nhạt.', fengShui:'Mạnh mẽ, vượt khó', position:'Ban công, sân thượng', status:'còn-hàng', images:['https://picsum.photos/seed/xuongrong1/600/600.jpg','https://picsum.photos/seed/xuongrong2/600/600.jpg','https://picsum.photos/seed/xuongrong3/600/600.jpg','https://picsum.photos/seed/xuongrong4/600/600.jpg'] },
  { id:7, name:'Trầu Bà Thanh Xuân', sciName:'Epipremnum aureum', category:'de-ban', price:95000, contactPrice:false, light:'Ít sáng', water:'Đổi nước 1 tuần/lần', description:'Dây leo mềm mại, vệt vàng thanh lịch.', fengShui:'Thanh xuân, sức sống', position:'Bàn làm việc, kệ treo', status:'ẩn', images:['https://picsum.photos/seed/trauba1/600/600.jpg','https://picsum.photos/seed/trauba2/600/600.jpg','https://picsum.photos/seed/trauba3/600/600.jpg','https://picsum.photos/seed/trauba4/600/600.jpg'] },
  { id:8, name:'Cây Lá Đỏ', sciName:'Cordyline fruticosa', category:'dai-sanh', price:0, contactPrice:true, light:'Nắng nhẹ', water:'2-3 lần/tuần', description:'Lá đỏ tía nổi bật, tạo điểm nhấn mạnh.', fengShui:'Sức mạnh, quyền uy', position:'Sảnh, quán cafe', status:'còn-hàng', images:['https://picsum.photos/seed/lado1/600/600.jpg','https://picsum.photos/seed/lado2/600/600.jpg','https://picsum.photos/seed/lado3/600/600.jpg','https://picsum.photos/seed/lado4/600/600.jpg'] }
];

var CATEGORY_LABELS = { 'phong-thuy': 'Cây phong thủy', 'de-ban': 'Cây để bàn', 'sen-da': 'Sen đá / Xương rồng', 'dai-sanh': 'Cây đại sảnh' };
var CATEGORY_BADGE_COLORS = { 'phong-thuy': 'bg-forest text-white', 'de-ban': 'bg-moss text-white', 'sen-da': 'bg-lime text-forest-dark', 'dai-sanh': 'bg-terra text-white' };
var CATEGORY_BADGE_TEXT = { 'phong-thuy': 'Phong thủy', 'de-ban': 'Để bàn', 'sen-da': 'Sen đá', 'dai-sanh': 'Đại sảnh' };

function loadPlants(callback) {
  var data = null;
  try {
    var saved = localStorage.getItem('tuongCafePlants');
    if (saved) { data = JSON.parse(saved); }
  } catch(e) {}

  if (!data || !Array.isArray(data) || data.length === 0) {
    data = JSON.parse(JSON.stringify(DEFAULT_PLANTS));
  }

  if (typeof callback === 'undefined') {
    return data;
  }
  callback(data);
}

function savePlants(arr) {
  try { localStorage.setItem('tuongCafePlants', JSON.stringify(arr)); } catch(e) {}
}

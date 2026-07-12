/**
 * app.js – Khởi tạo trang chủ
 * Phải load SAU data.js, main.js, catalog.js
 */

document.addEventListener('DOMContentLoaded', function () {
  /* Khởi tạo Lucide icons */
  lucide.createIcons();

  /* Render danh sách cây từ data.js */
  renderPlantGrid();
});
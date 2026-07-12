/**
 * sidebar.js – Sidebar toggle & điều hướng trang
 */

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}

var pageTitles = {
  'dashboard': 'Tổng quan',
  'plants': 'Quản lý cây cảnh',
  'addPlant': 'Thêm cây mới',
  'images': 'Thư viện ảnh',
  'settings': 'Cài đặt'
};

function showPage(pageName) {
  /* Ẩn tất cả page */
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }
  document.getElementById('page-' + pageName).classList.add('active');

  /* Highlight nav */
  var navItems = document.querySelectorAll('.nav-item');
  for (var j = 0; j < navItems.length; j++) {
    navItems[j].classList.remove('active');
  }
  var activeNav = document.querySelector('.nav-item[data-page="' + pageName + '"]');
  if (activeNav) activeNav.classList.add('active');

  /* Tiêu đề */
  var title = pageTitles[pageName] || '';
  if (pageName === 'addPlant' && document.getElementById('editPlantId').value) {
    title = 'Chỉnh sửa cây';
  }
  document.getElementById('pageTitle').textContent = title;

  /* Đóng sidebar mobile */
  var sidebar = document.getElementById('sidebar');
  if (!sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
    toggleSidebar();
  }

  /* Render nội dung từng trang */
  if (pageName === 'plants') renderPlantsList();
  if (pageName === 'dashboard') renderDashboard();
  if (pageName === 'images') renderImageLibrary();

  lucide.createIcons();
}
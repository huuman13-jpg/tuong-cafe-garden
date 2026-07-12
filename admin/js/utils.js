/**
 * utils.js – Hàm tiện ích dùng chung
 * Chứa: showToast, formatPrice, statusLabel, formatFileSize
 */

function showToast(message, type) {
  type = type || 'info';

  var container = document.getElementById('toastContainer');
  var toast = document.createElement('div');

  var colors = {
    success: 'bg-forest text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-white text-forest border border-forest/10 shadow-lg'
  };

  var icons = {
    success: 'check-circle',
    error: 'trash-2',
    info: 'info'
  };

  toast.className = 'toast flex items-center gap-3 px-5 py-3.5 rounded-xl ' + colors[type] + ' text-sm font-medium shadow-xl max-w-sm';
  toast.innerHTML = '<i data-lucide="' + icons[type] + '" class="w-5 h-5 flex-shrink-0"></i><span>' + message + '</span>';
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(function () {
    if (toast.parentNode) toast.remove();
  }, 3200);
}

function formatPrice(price, contactPrice) {
  if (contactPrice || price === 0) {
    return '<span class="text-moss font-medium">Liên hệ</span>';
  }
  return new Intl.NumberFormat('vi-VN').format(price) + ' <span class="text-terra-light">đ</span>';
}

function statusLabel(s) {
  if (s === 'còn-hàng') return 'Còn hàng';
  if (s === 'hết-hàng') return 'Hết hàng';
  return 'Đã ẩn';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
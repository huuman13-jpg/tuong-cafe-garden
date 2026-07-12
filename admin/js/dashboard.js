/**
 * dashboard.js – Render trang tổng quan
 */

function updateStats() {
  document.getElementById('statTotal').textContent = plants.length;
  document.getElementById('statInStock').textContent = plants.filter(function (p) { return p.status === 'còn-hàng'; }).length;
  document.getElementById('statOutStock').textContent = plants.filter(function (p) { return p.status === 'hết-hàng'; }).length;
  document.getElementById('statHidden').textContent = plants.filter(function (p) { return p.status === 'ẩn'; }).length;
  document.getElementById('plantCount').textContent = plants.length;
}

function renderDashboard() {
  var list = document.getElementById('recentPlantsList');
  var recent = plants.slice().sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).slice(0, 5);

  var html = '';
  for (var i = 0; i < recent.length; i++) {
    var p = recent[i];
    html += '<div class="table-row flex items-center gap-4 px-6 py-3.5">' +
      '<img src="' + (p.images[0] || 'https://picsum.photos/seed/placeholder/80/80.jpg') + '" alt="" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">' +
      '<div class="flex-1 min-w-0">' +
        '<div class="text-sm font-medium text-forest truncate">' + p.name + '</div>' +
        '<div class="text-xs text-terra-light">' + categoryLabels[p.category] + '</div>' +
      '</div>' +
      '<div class="text-sm text-right flex-shrink-0">' + formatPrice(p.price, p.contactPrice) + '</div>' +
      '<span class="status-' + p.status + ' text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">' + statusLabel(p.status) + '</span>' +
    '</div>';
  }
  list.innerHTML = html;
  lucide.createIcons();
}
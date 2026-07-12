/* Thay thế toàn bộ file admin/js/plants.js bằng bản này: */

function renderPlantsList() {
  var search = (document.getElementById('searchPlant').value || '').toLowerCase();
  var statusFilter = document.getElementById('filterStatus').value || 'all';

  var filtered = plants.filter(function (p) {
    var matchSearch = p.name.toLowerCase().indexOf(search) !== -1;
    var matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  /* Desktop Table */
  var tbody = document.getElementById('plantsTableBody');
  var tableHtml = '';
  for (var i = 0; i < filtered.length; i++) {
    var p = filtered[i];
    tableHtml +=
      '<tr class="table-row border-b border-forest/5">' +
        '<td class="px-6 py-3.5"><img src="' + (p.images[0] || 'https://picsum.photos/seed/placeholder/80/80.jpg') + '" alt="" class="w-12 h-12 rounded-xl object-cover"></td>' +
        '<td class="px-6 py-3.5"><span class="text-sm font-medium text-forest quick-edit-target cursor-pointer hover:text-moss transition-colors" ondblclick="quickEdit(this,' + p.id + ',\'name\')">' + p.name + '</span></td>' +
        '<td class="px-6 py-3.5"><span class="text-xs font-medium px-2.5 py-1 rounded-full ' + categoryBadgeColors[p.category] + '">' + categoryLabels[p.category] + '</span></td>' +
        '<td class="px-6 py-3.5"><span class="text-sm quick-edit-target cursor-pointer hover:text-moss transition-colors" ondblclick="quickEdit(this,' + p.id + ',\'price\')">' + formatPrice(p.price, p.contactPrice) + '</span></td>' +
        '<td class="px-6 py-3.5"><select onchange="changeStatus(' + p.id + ',this.value)" class="text-xs font-medium px-2.5 py-1.5 rounded-full border-0 cursor-pointer status-' + p.status + '"><option value="còn-hàng"' + (p.status === 'còn-hàng' ? ' selected' : '') + '>🟢 Còn hàng</option><option value="hết-hàng"' + (p.status === 'hết-hàng' ? ' selected' : '') + '>🟡 Hết hàng</option><option value="ẩn"' + (p.status === 'ẩn' ? ' selected' : '') + '>⚫ Ẩn</option></select></td>' +
        '<td class="px-6 py-3.5 text-center"><div class="flex items-center justify-center gap-1"><button onclick="editPlant(' + p.id + ')" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-forest/5 transition-colors" title="Sửa"><i data-lucide="pencil" class="w-4 h-4 text-forest/60"></i></button><button onclick="deletePlant(' + p.id + ')" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors" title="Xóa"><i data-lucide="trash-2" class="w-4 h-4 text-red-400"></i></button></div></td>' +
      '</tr>';
  }
  tbody.innerHTML = tableHtml;

  /* Mobile Cards */
  var mobileList = document.getElementById('plantsMobileList');
  var mobileHtml = '';
  for (var j = 0; j < filtered.length; j++) {
    var p2 = filtered[j];
    mobileHtml +=
      '<div class="p-4"><div class="flex items-start gap-3"><img src="' + (p2.images[0] || 'https://picsum.photos/seed/placeholder/80/80.jpg') + '" alt="" class="w-16 h-16 rounded-xl object-cover flex-shrink-0"><div class="flex-1 min-w-0"><div class="text-sm font-medium text-forest mb-1 quick-edit-target cursor-pointer" ondblclick="quickEdit(this,' + p2.id + ',\'name\')">' + p2.name + '</div><div class="flex items-center gap-2 mb-2"><span class="text-xs font-medium px-2 py-0.5 rounded-full ' + categoryBadgeColors[p2.category] + '">' + categoryLabels[p2.category] + '</span><span class="status-' + p2.status + ' text-xs font-medium px-2 py-0.5 rounded-full">' + statusLabel(p2.status) + '</span></div><div class="text-sm quick-edit-target" ondblclick="quickEdit(this,' + p2.id + ',\'price\')">' + formatPrice(p2.price, p2.contactPrice) + '</div></div></div><div class="flex items-center justify-between mt-3 pt-3 border-t border-forest/5"><select onchange="changeStatus(' + p2.id + ',this.value)" class="text-xs px-2.5 py-1.5 rounded-full border border-forest/10 status-' + p2.status + ' cursor-pointer"><option value="còn-hàng"' + (p2.status === 'còn-hàng' ? ' selected' : '') + '>🟢 Còn hàng</option><option value="hết-hàng"' + (p2.status === 'hết-hàng' ? ' selected' : '') + '>🟡 Hết hàng</option><option value="ẩn"' + (p2.status === 'ẩn' ? ' selected' : '') + '>⚫ Ẩn</option></select><div class="flex items-center gap-1"><button onclick="editPlant(' + p2.id + ')" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-forest/5 transition-colors"><i data-lucide="pencil" class="w-4 h-4 text-forest/60"></i></button><button onclick="deletePlant(' + p2.id + ')" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"><i data-lucide="trash-2" class="w-4 h-4 text-red-400"></i></button></div></div></div>';
  }
  mobileList.innerHTML = mobileHtml;

  updateStats();
  lucide.createIcons();
}

function filterPlants() { renderPlantsList(); }

function quickEdit(el, plantId, field) {
  if (el.querySelector('.quick-edit-input')) return;
  var plant = plants.find(function (p) { return p.id === plantId; });
  var originalHTML = el.innerHTML;
  var inputVal = field === 'price' ? (plant.contactPrice ? '' : plant.price) : plant[field];

  var input = document.createElement('input');
  input.type = field === 'price' ? 'number' : 'text';
  input.className = 'quick-edit-input';
  input.value = inputVal;
  if (field === 'price') input.placeholder = 'Nhập giá mới';

  el.innerHTML = '';
  el.appendChild(input);
  input.focus();
  input.select();

  function save() {
    if (field === 'price') {
      var val = input.value;
      if (val === '' || val === '0') { plant.contactPrice = true; plant.price = 0; }
      else { plant.contactPrice = false; plant.price = parseInt(val) || 0; }
    } else {
      plant[field] = input.value;
    }
    savePlants(plants);   /* ← GHI localStorage – trang chủ sẽ đọc được */
    renderPlantsList();
    showToast('Đã cập nhật!', 'success');
  }

  input.addEventListener('blur', save);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { el.innerHTML = originalHTML; }
  });
}

function changeStatus(plantId, newStatus) {
  var plant = plants.find(function (p) { return p.id === plantId; });
  if (plant) {
    plant.status = newStatus;
    savePlants(plants);   /* ← GHI localStorage */
    renderPlantsList();
    showToast('Đã đổi "' + plant.name + '" sang: ' + statusLabel(newStatus), 'success');
  }
}

function deletePlant(plantId) {
  var plant = plants.find(function (p) { return p.id === plantId; });
  if (plant && confirm('Xóa "' + plant.name + '"?')) {
    plants = plants.filter(function (p) { return p.id !== plantId; });
    savePlants(plants);   /* ← GHI localStorage */
    renderPlantsList();
    showToast('Đã xóa "' + plant.name + '"', 'error');
  }
}

function editPlant(plantId) {
  var plant = plants.find(function (p) { return p.id === plantId; });
  if (!plant) return;

  document.getElementById('editPlantId').value = plant.id;
  document.getElementById('plantName').value = plant.name;
  document.getElementById('plantCategory').value = plant.category;
  document.getElementById('plantPrice').value = plant.contactPrice ? '' : plant.price;
  document.getElementById('plantContactPrice').checked = plant.contactPrice;
  togglePriceInput();
  document.getElementById('plantLight').value = plant.light;
  document.getElementById('plantWater').value = plant.water;
  document.getElementById('plantDescription').innerHTML = plant.description || '';
  document.getElementById('plantFengShui').value = plant.fengShui || '';
  document.getElementById('plantPosition').value = plant.position || '';

  var radios = document.querySelectorAll('input[name="plantStatus"]');
  for (var i = 0; i < radios.length; i++) radios[i].checked = radios[i].value === plant.status;

  uploadedImages = plant.images.slice();
  renderUploadedImageList();

  document.getElementById('submitBtnText').textContent = 'Cập nhật cây';
  showPage('addPlant');
  document.getElementById('pageTitle').textContent = 'Chỉnh sửa: ' + plant.name;
}

function handleSavePlant(e) {
  e.preventDefault();
  var editId = document.getElementById('editPlantId').value;

  var plantData = {
    name: document.getElementById('plantName').value,
    sciName: document.getElementById('plantName').value,
    category: document.getElementById('plantCategory').value,
    price: parseInt(document.getElementById('plantPrice').value) || 0,
    contactPrice: document.getElementById('plantContactPrice').checked,
    light: document.getElementById('plantLight').value,
    water: document.getElementById('plantWater').value,
    description: document.getElementById('plantDescription').innerText,
    fengShui: document.getElementById('plantFengShui').value,
    position: document.getElementById('plantPosition').value,
    status: document.querySelector('input[name="plantStatus"]:checked').value,
    images: uploadedImages.length > 0 ? uploadedImages.slice() : ['https://picsum.photos/seed/new-plant/400/400.jpg']
  };

  if (editId) {
    var existing = plants.find(function (p) { return p.id === parseInt(editId); });
    if (existing) { for (var key in plantData) existing[key] = plantData[key]; }
    showToast('Đã cập nhật "' + plantData.name + '"!', 'success');
  } else {
    plantData.id = nextId++;
    plantData.createdAt = new Date().toISOString().split('T')[0];
    plants.push(plantData);
    showToast('Đã thêm "' + plantData.name + '"!', 'success');
  }

  savePlants(plants);   /* ← GHI localStorage – trang chủ đọc được ngay */
  resetForm();
  showPage('plants');
}

function resetForm() {
  document.getElementById('plantForm').reset();
  document.getElementById('editPlantId').value = '';
  document.getElementById('plantDescription').innerHTML = '';
  document.getElementById('submitBtnText').textContent = 'Lưu cây mới';
  uploadedImages = [];
  renderUploadedImageList();
  togglePriceInput();
  var r = document.querySelector('input[name="plantStatus"][value="còn-hàng"]');
  if (r) r.checked = true;
}
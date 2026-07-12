/**
 * images.js – Upload ảnh, drag-drop sắp xếp, thư viện ảnh
 */

/* ===== UPLOAD CHO FORM THÊM/SỬA CÂY ===== */

(function initUploadZone() {
  var zone = document.getElementById('uploadZone');
  if (!zone) return;

  zone.addEventListener('dragover', function (e) {
    e.preventDefault();
    zone.classList.add('dragover');
  });

  zone.addEventListener('dragleave', function () {
    zone.classList.remove('dragover');
  });

  zone.addEventListener('drop', function (e) {
    e.preventDefault();
    zone.classList.remove('dragover');
    processFiles(e.dataTransfer.files);
  });
})();

function handleFileUpload(e) {
  processFiles(e.target.files);
  e.target.value = '';
}

function processFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (!file.type.startsWith('image/')) continue;

    showToast('⚡ Đang nén "' + file.name + '" → WebP...', 'info');

    (function (f) {
      var reader = new FileReader();
      reader.onload = function (e) {
        /* Mô phỏng nén: trong production gọi API server để convert WebP thật */
        var compressedSize = Math.round(f.size * 0.25);
        uploadedImages.push(e.target.result);
        renderUploadedImageList();
        showToast('✅ Đã nén: ' + f.name + ' (' + formatFileSize(f.size) + ' → ' + formatFileSize(compressedSize) + ')', 'success');
      };
      reader.readAsDataURL(f);
    })(file);
  }
}

function renderUploadedImageList() {
  var container = document.getElementById('imageList');
  var countEl = document.getElementById('imageCount');

  if (uploadedImages.length === 0) {
    container.innerHTML = '';
    countEl.classList.add('hidden');
    return;
  }

  countEl.classList.remove('hidden');
  countEl.textContent = uploadedImages.length + ' ảnh • Kéo thả để sắp xếp thứ tự';

  var html = '';
  for (var i = 0; i < uploadedImages.length; i++) {
    html += '<div class="img-item flex items-center gap-3 p-2.5 bg-cream rounded-xl border-2 border-transparent hover:border-lime/50" ' +
      'draggable="true" data-index="' + i + '" ' +
      'ondragstart="imgDragStart(event,' + i + ')" ' +
      'ondragover="imgDragOver(event)" ' +
      'ondrop="imgDrop(event,' + i + ')" ' +
      'ondragend="imgDragEnd(event)" ' +
      'ondragenter="imgDragEnter(event)" ' +
      'ondragleave="imgDragLeave(event)">' +
      '<div class="w-5 h-5 flex items-center justify-center text-xs font-bold text-terra-light flex-shrink-0">' + (i + 1) + '</div>' +
      '<img src="' + uploadedImages[i] + '" alt="" class="w-14 h-14 rounded-lg object-cover flex-shrink-0">' +
      '<div class="flex-1 min-w-0">' +
        '<div class="text-xs font-medium text-forest truncate">Ảnh ' + (i + 1) + '</div>' +
        '<div class="text-[10px] text-moss font-medium">WebP • Đã nén</div>' +
      '</div>' +
      '<button type="button" onclick="removeUploadedImage(' + i + ')" class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">' +
        '<i data-lucide="x" class="w-3.5 h-3.5 text-red-400"></i>' +
      '</button>' +
    '</div>';
  }
  container.innerHTML = html;
  lucide.createIcons();
}

function removeUploadedImage(index) {
  uploadedImages.splice(index, 1);
  renderUploadedImageList();
}

/* ===== DRAG & DROP REORDER ===== */
var imgDragIndex = null;

function imgDragStart(e, index) {
  imgDragIndex = index;
  e.target.closest('.img-item').classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function imgDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function imgDragEnter(e) {
  e.preventDefault();
  var item = e.target.closest('.img-item');
  if (item) item.classList.add('drag-over');
}

function imgDragLeave(e) {
  var item = e.target.closest('.img-item');
  if (item) item.classList.remove('drag-over');
}

function imgDragEnd(e) {
  var items = document.querySelectorAll('.img-item');
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('dragging', 'drag-over');
  }
}

function imgDrop(e, targetIndex) {
  e.preventDefault();
  var items = document.querySelectorAll('.img-item');
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('dragging', 'drag-over');
  }
  if (imgDragIndex === null || imgDragIndex === targetIndex) return;

  var item = uploadedImages.splice(imgDragIndex, 1)[0];
  uploadedImages.splice(targetIndex, 0, item);
  renderUploadedImageList();
  imgDragIndex = null;
}

/* ===== THƯ VIỆN ẢNH ===== */

function renderImageLibrary() {
  var grid = document.getElementById('imageLibrary');
  var empty = document.getElementById('emptyLibrary');

  if (libraryImages.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  var html = '';
  for (var i = 0; i < libraryImages.length; i++) {
    html += '<div class="relative group rounded-xl overflow-hidden aspect-square bg-sand">' +
      '<img src="' + libraryImages[i] + '" alt="" class="w-full h-full object-cover">' +
      '<div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">' +
        '<button onclick="deleteLibraryImage(' + i + ')" class="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">' +
          '<i data-lucide="trash-2" class="w-3.5 h-3.5"></i>' +
        '</button>' +
      '</div>' +
    '</div>';
  }
  grid.innerHTML = html;
  lucide.createIcons();
}

function handleLibraryUpload(e) {
  for (var i = 0; i < e.target.files.length; i++) {
    var file = e.target.files[i];
    if (!file.type.startsWith('image/')) continue;

    showToast('⚡ Đang nén "' + file.name + '" → WebP...', 'info');

    (function (f) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        libraryImages.push(ev.target.result);
        renderImageLibrary();
        showToast('✅ Đã thêm vào thư viện', 'success');
      };
      reader.readAsDataURL(f);
    })(file);
  }
  e.target.value = '';
}

function deleteLibraryImage(index) {
  libraryImages.splice(index, 1);
  renderImageLibrary();
  showToast('Đã xóa ảnh', 'error');
}
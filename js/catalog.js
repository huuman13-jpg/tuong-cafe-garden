/**
 * catalog.js – Render cây cảnh, bộ lọc, lightbox, modal chi tiết
 * Đọc dữ liệu từ loadPlants() trong data.js
 */

/* ---------- Render plant grid ---------- */
function renderPlantGrid() {
  var grid = document.getElementById('plantGrid');
  if (!grid) return;

  var plants = loadPlants();
  /* Chỉ hiển thị cây "còn-hàng" */
  var visible = plants.filter(function (p) {
    return p.status === 'còn-hàng';
  });

  var html = '';
  for (var i = 0; i < visible.length; i++) {
    var p = visible[i];
    var img = p.images && p.images.length > 0 ? p.images[0] : 'https://picsum.photos/seed/placeholder/400/400.jpg';
    var badgeText = CATEGORY_BADGE_TEXT[p.category] || p.category;
    var badgeColor = CATEGORY_BADGE_COLORS[p.category] || 'bg-gray-200 text-gray-700';
    var sciName = p.sciName || '';

    html +=
      '<div class="plant-card bg-white rounded-2xl overflow-hidden border border-forest/5" data-category="' + p.category + '">' +
        '<div class="relative overflow-hidden cursor-pointer" onclick="openLightbox(' + p.id + ')">' +
          '<img src="' + img + '" alt="' + p.name + '" class="w-full h-52 object-cover hover:scale-110 transition-transform duration-700" loading="lazy">' +
          '<div class="absolute top-3 left-3">' +
            '<span class="' + badgeColor + ' text-xs font-medium px-3 py-1 rounded-full">' + badgeText + '</span>' +
          '</div>' +
          '<div class="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">' +
            '<i data-lucide="zoom-in" class="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity"></i>' +
          '</div>' +
        '</div>' +
        '<div class="p-5">' +
          '<h3 class="font-semibold text-forest text-base mb-1">' + p.name + '</h3>' +
          (sciName ? '<p class="text-xs text-terra-light italic mb-3">' + sciName + '</p>' : '<div class="mb-3"></div>') +
          '<div class="flex items-center gap-4 text-xs text-terra mb-4">' +
            '<span class="flex items-center gap-1"><i data-lucide="sun" class="w-3.5 h-3.5"></i> ' + (p.light || '') + '</span>' +
            '<span class="flex items-center gap-1"><i data-lucide="droplets" class="w-3.5 h-3.5"></i> ' + (p.water || '') + '</span>' +
          '</div>' +
          '<p class="text-xs text-forest/70 leading-relaxed mb-4">' + (p.fengShui || '') + '</p>' +
          '<button onclick="openDetail(' + p.id + ')" class="w-full bg-forest/5 text-forest text-sm font-medium py-2.5 rounded-xl hover:bg-forest hover:text-white transition-all duration-300">' +
            'Xem chi tiết' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  grid.innerHTML = html;
  lucide.createIcons();
  initFilters();
}

/* ---------- Filter tabs ---------- */
function initFilters() {
  var btns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.plant-card');

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      /* Active state */
      for (var j = 0; j < btns.length; j++) btns[j].classList.remove('active');
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      for (var k = 0; k < cards.length; k++) {
        var card = cards[k];
        var cat = card.getAttribute('data-category');

        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          (function (el) {
            setTimeout(function () {
              el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, 50);
          })(card);
        } else {
          card.style.display = 'none';
        }
      }
    });
  }
}

/* ---------- Lightbox ---------- */
var currentLightboxIndex = 0;
var allLightboxImages = [];

function getAllImages() {
  var plants = loadPlants().filter(function (p) { return p.status === 'còn-hàng'; });
  var imgs = [];
  for (var i = 0; i < plants.length; i++) {
    if (plants[i].images) {
      for (var j = 0; j < plants[i].images.length; j++) {
        imgs.push(plants[i].images[j]);
      }
    }
  }
  return imgs;
}

function findImageIndex(plantId) {
  var plants = loadPlants().filter(function (p) { return p.status === 'còn-hàng'; });
  var idx = 0;
  for (var i = 0; i < plants.length; i++) {
    if (plants[i].id === plantId) return idx;
    idx += (plants[i].images ? plants[i].images.length : 0);
  }
  return 0;
}

function openLightbox(plantId) {
  allLightboxImages = getAllImages();
  currentLightboxIndex = findImageIndex(plantId);
  document.getElementById('lightboxImg').src = allLightboxImages[currentLightboxIndex];
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxNext() {
  currentLightboxIndex = (currentLightboxIndex + 1) % allLightboxImages.length;
  document.getElementById('lightboxImg').src = allLightboxImages[currentLightboxIndex];
}

function lightboxPrev() {
  currentLightboxIndex = (currentLightboxIndex - 1 + allLightboxImages.length) % allLightboxImages.length;
  document.getElementById('lightboxImg').src = allLightboxImages[currentLightboxIndex];
}

/* ---------- Detail modal ---------- */
function openDetail(plantId) {
  var plants = loadPlants();
  var plant = null;
  for (var i = 0; i < plants.length; i++) {
    if (plants[i].id === plantId) { plant = plants[i]; break; }
  }
  if (!plant) return;

  document.getElementById('detailMainImg').src = plant.images[0] || '';
  document.getElementById('detailName').textContent = plant.name;
  document.getElementById('detailSciName').textContent = plant.sciName || '';
  document.getElementById('detailLight').textContent = plant.light || '';
  document.getElementById('detailWater').textContent = plant.water || '';
  document.getElementById('detailFengShui').textContent = plant.fengShui || '';
  document.getElementById('detailPosition').textContent = plant.position || '';
  document.getElementById('detailDesc').textContent = plant.description || '';

  var badge = document.getElementById('detailBadge');
  badge.textContent = CATEGORY_BADGE_TEXT[plant.category] || plant.category;
  badge.className = 'inline-block self-start text-xs font-medium px-3 py-1 rounded-full mb-4 ' + (CATEGORY_BADGE_COLORS[plant.category] || 'bg-gray-200 text-gray-700');

  /* Thumbnails */
  var thumbsContainer = document.getElementById('detailThumbs');
  thumbsContainer.innerHTML = '';
  if (plant.images) {
    for (var j = 0; j < plant.images.length; j++) {
      (function (imgSrc, index) {
        var thumb = document.createElement('div');
        thumb.className = 'rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ' + (index === 0 ? 'border-forest' : 'border-transparent hover:border-lime');
        thumb.innerHTML = '<img src="' + imgSrc + '" alt="" class="w-full h-16 md:h-20 object-cover">';
        thumb.addEventListener('click', function () {
          document.getElementById('detailMainImg').src = imgSrc;
          var all = thumbsContainer.querySelectorAll('div');
          for (var k = 0; k < all.length; k++) all[k].classList.replace('border-forest', 'border-transparent');
          thumb.classList.replace('border-transparent', 'border-forest');
        });
        thumbsContainer.appendChild(thumb);
      })(plant.images[j], j);
    }
  }

  document.getElementById('detailModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeDetail() {
  document.getElementById('detailModal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* Keyboard */
document.addEventListener('keydown', function (e) {
  if (document.getElementById('lightbox').classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
  }
  if (!document.getElementById('detailModal').classList.contains('hidden')) {
    if (e.key === 'Escape') closeDetail();
  }
});
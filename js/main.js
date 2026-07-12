/**
 * main.js – Header scroll, mobile menu, smooth scroll, scroll animations
 */

/* ---------- Header scroll effect ---------- */
(function () {
  var header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header.classList.add('bg-cream/95', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-forest/5');
    } else {
      header.classList.remove('bg-cream/95', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-forest/5');
    }
  });
})();

/* ---------- Mobile menu ---------- */
(function () {
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  var icon = document.getElementById('menuIcon');
  if (!toggle || !menu || !icon) return;

  var isOpen = false;

  toggle.addEventListener('click', function () {
    isOpen = !isOpen;
    menu.classList.toggle('hidden');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
  });

  var links = menu.querySelectorAll('.mobile-link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      menu.classList.add('hidden');
      isOpen = false;
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  }
})();

/* ---------- Smooth scroll ---------- */
(function () {
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }
})();

/* ---------- Scroll fade-up animation ---------- */
(function () {
  var elements = document.querySelectorAll('.fade-up');
  if (elements.length === 0) return;

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  for (var i = 0; i < elements.length; i++) {
    observer.observe(elements[i]);
  }
})();
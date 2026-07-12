/**
 * auth.js – Xử lý đăng nhập / đăng xuất
 */

function handleLogin(e) {
  e.preventDefault();

  var user = document.getElementById('loginUser').value;
  var pass = document.getElementById('loginPass').value;

  if (user === 'tuongadmin' && pass === 'admin123') {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    localStorage.setItem('tuongAdminAuth', 'true');
    refreshAll();
  } else {
    var errEl = document.getElementById('loginError');
    errEl.classList.remove('hidden');
    setTimeout(function () { errEl.classList.add('hidden'); }, 3000);
  }
}

function handleLogout() {
  localStorage.removeItem('tuongAdminAuth');
  document.getElementById('adminDashboard').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}

function togglePassVisibility() {
  var inp = document.getElementById('loginPass');
  var icon = document.getElementById('passToggleIcon');

  if (inp.type === 'password') {
    inp.type = 'text';
    icon.setAttribute('data-lucide', 'eye');
  } else {
    inp.type = 'password';
    icon.setAttribute('data-lucide', 'eye-off');
  }
  lucide.createIcons();
}

/* Tự động đăng nhập nếu đã có session */
function checkAutoLogin() {
  if (localStorage.getItem('tuongAdminAuth') === 'true') {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    refreshAll();
  }
}
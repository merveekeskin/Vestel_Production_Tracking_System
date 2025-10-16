function toggleSubMenu(event) {
  event.preventDefault();
  var submenu = document.getElementById('productionSubmenu');
  submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
}
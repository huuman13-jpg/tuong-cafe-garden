/**
 * editor.js – Rich text editor commands
 */

function execCmd(command) {
  document.execCommand(command, false, null);
  document.getElementById('plantDescription').focus();
}

function execCmdVal(command, value) {
  document.execCommand(command, false, value);
  document.getElementById('plantDescription').focus();
}

function togglePriceInput() {
  var priceInput = document.getElementById('plantPrice');
  var contactCheck = document.getElementById('plantContactPrice');
  priceInput.disabled = contactCheck.checked;
  priceInput.style.opacity = contactCheck.checked ? '0.4' : '1';
}
"use strict";

var modalMessage = document.getElementById('modal-message');
if (modalMessage) {
  modalMessage.addEventListener('animationend', function (e) {
    if (e.animationName == 'hide') {
      e.target.remove();
    }
  });
}
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var containerTask = document.querySelector(".container-tasks");
var checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']");
var taskList = document.getElementById("task-list");
var taskDock = document.getElementById("task-dock");
var pages = 0;
var tasksDone = document.getElementById('tasks-done');
var taskPending = document.getElementById("tasks-pending");
var buttonLeft = document.getElementById("button-left");
var buttonRight = document.getElementById("button-right");
var inputInfo = {
  total: checkboxInputs.length,
  getInputDone: function getInputDone() {
    var countDone = 0;
    checkboxInputs.forEach(function (input) {
      if (input.checked == true) {
        countDone++;
      }
    });
    return countDone;
  },
  getInputPending: function getInputPending() {
    var countPending = 0;
    checkboxInputs.forEach(function (input) {
      if (!input.checked == true) {
        countPending++;
      }
    });
    return countPending;
  }
};

// funcionalidad modal options
containerTask.addEventListener('click', toggleOptionsModal);
containerTask.addEventListener("change", updateInfo);

// Agregar info task
tasksDone.addEventListener('load', updateTasksDone());
taskPending.addEventListener('load', updateTasksPending());

// Agregar dock
taskDock.addEventListener("load", createDockPage());

// seleccionar dot del dock
document.addEventListener("resize", pageSelected);
taskList.addEventListener("scroll", pageSelected);

// evento scrollear al dot del dock seleccionado
taskDock.addEventListener("click", movePageAt);

// agregar bottones para scrollear
buttonLeft.addEventListener("click", function () {
  taskList.scrollBy({
    top: 0,
    left: -10,
    behavior: "smooth"
  });
});
buttonRight.addEventListener("click", function () {
  taskList.scrollBy({
    top: 0,
    left: 10,
    behavior: "smooth"
  });
});
function toggleOptionsModal(e) {
  // btn para abrir/cerrar modal
  if (e.target.closest('[icon="fluent:options-20-filled"] ')) {
    var tasklistOptions = e.target.nextElementSibling;

    // previniendo que se abra mas de un modal
    // capturando todos los elementos que si estan visibles
    // se les agrega la clase hidden para ocultarlos
    // solo se le quita al elemento que se ha hecho click
    containerTask.querySelectorAll('.task-list__options__btn:not(.task-list__options__btn--hidden)').forEach(function (taskOptionsEl) {
      console.log("entra aca");
      taskOptionsEl.classList.add("task-list__options__btn--hidden");
    });

    // toggle para abrir y cerrar opciones
    tasklistOptions.classList.toggle("task-list__options__btn--hidden");
  } else if (e.target.closest('.task-list__icon--close')) {
    var btnClose = null;
    if (e.target.classList.contains("task-list__icon--close")) {
      btnClose = e.target;
    } else {
      btnClose = e.target.parentElement;
    }
    var _tasklistOptions = btnClose.parentElement;
    _tasklistOptions.classList.add("task-list__options__btn--hidden");
  }
}
function updateInfo(e) {
  checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']");
  if (e.target.getAttribute('type') == 'checkbox') {
    updateTasksDone();
    updateTasksPending();
  }
}
function updateTasksDone() {
  var tasksDone = document.getElementById('tasks-done');
  if (tasksDone) {
    tasksDone.textContent = inputInfo.getInputDone();
  }
}
function updateTasksPending() {
  if (taskPending) {
    taskPending.textContent = inputInfo.getInputPending();
  }
}

// determina cuantas paginas de scroll hay

function pageSelected() {
  pages = Math.round(taskList.scrollWidth / taskList.offsetWidth);

  // redondea el width a un numero entero de la ventana de tareas
  var offsetWidth = Math.floor(taskList.scrollWidth / pages);

  // dot actual
  var index = Math.round(taskList.scrollLeft / offsetWidth);

  // se le aplican las clases al dock seleccionado
  selectDock(index);
}
function createDockPage() {
  var length = Math.round(taskList.scrollWidth / taskList.offsetWidth);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < length; i++) {
    var circle = document.createElement("span");
    circle.classList.add("task-dock__circle");
    fragment.append(circle);
  }
  if (taskDock) {
    while (taskDock.firstChild) {
      taskDock.removeChild(taskDock.firstChild);
    }
    taskDock.append(fragment);
  }
  pageSelected();
}
function selectDock(index) {
  var docks = document.querySelectorAll('.task-dock__circle');
  console.log("entra acá");
  if (docks && docks.length > 0) {
    docks.forEach(function (dock) {
      dock.classList.remove("task-dock__circle--active");
    });
    console.log(index);
    docks[index].classList.add("task-dock__circle--active");
  }
}
function movePageAt(e) {
  var nextIndex = -1;
  var currentIndex = -1;
  if (e.target.classList.contains('task-dock__circle')) {
    if (!e.target.classList.contains('task-dock__circle--active')) {
      var selectedDot = e.target;
      var currentDot = taskDock.querySelector(".task-dock__circle--active");
      var dots = _toConsumableArray(document.querySelectorAll(".task-dock__circle"));
      if (dots && dots.length > 0) {
        nextIndex = dots.indexOf(selectedDot);
        currentIndex = dots.indexOf(currentDot);
        console.log(nextIndex);
        console.log(currentIndex);
        var desplazamiento = -1;
        var width = taskList.offsetWidth;
        if (nextIndex > currentIndex) {
          desplazamiento = nextIndex - currentIndex;
          taskList.scrollBy({
            top: 0,
            left: width * desplazamiento,
            behavior: "smooth"
          });
        } else {
          desplazamiento = -1 * (currentIndex - nextIndex);
          taskList.scrollBy({
            top: 0,
            left: width * desplazamiento,
            behavior: "smooth"
          });
        }
        console.log(desplazamiento);
      }
    }
  }
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Note = /*#__PURE__*/function () {
  function Note(title) {
    _classCallCheck(this, Note);

    this.title = title;
    this.element = this.createElement(title);
  }

  _createClass(Note, [{
    key: "createElement",
    value: function createElement(title) {
      var newNote = document.createElement("li");
      newNote.innerHTML = title;
      newNote.addEventListener('click', this.remove.bind(newNote));
      return newNote;
    }
  }, {
    key: "add",
    value: function add() {
      document.getElementById("taskList").appendChild(this.element);
    }
  }, {
    key: "saveToStorage",
    value: function saveToStorage() {
      var storeNotes = [];
      storeNotes = JSON.parse(localStorage.getItem('storedNotes')) || [];
      storeNotes.push(this.title);
      localStorage.setItem('storedNotes', JSON.stringify(storeNotes));
    }
  }, {
    key: "remove",
    value: function remove() {
      var removeNote = document.getElementById("taskList");
      removeNote.removeChild(this);
      var loadNotes = JSON.parse(localStorage.getItem('storedNotes'));
      var index = loadNotes.indexOf(this.innerHTML);
      loadNotes.splice(index, 1);
      localStorage.setItem('storedNotes', JSON.stringify(loadNotes));
    }
  }]);

  return Note;
}();

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.txtTodo = document.getElementById("taskInput");
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }

  _createClass(App, [{
    key: "loadNotesFromStorage",
    value: function loadNotesFromStorage() {
      var loadNotes = JSON.parse(localStorage.getItem('storedNotes'));
      loadNotes.forEach(function (note) {
        var noteLoaded = new Note(note);
        noteLoaded.add();
      });
    }
  }, {
    key: "createNote",
    value: function createNote(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var note = new Note(this.txtTodo.value);
        note.add();
        this.reset();
        note.saveToStorage();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.txtTodo.value = "";
    }
  }]);

  return App;
}();

var app = new App();
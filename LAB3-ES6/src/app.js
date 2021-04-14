class Note {
    constructor(title) {
      this.title = title;
      this.element = this.createElement(title);
    }
  
    createElement(title) {
      let newNote = document.createElement("li");
      newNote.innerHTML = title;

      newNote.addEventListener('click', this.remove.bind(newNote));
      return newNote;
    }
  
    add() {
      document.getElementById("taskList").appendChild(this.element);
    }
  
    saveToStorage() {
      let storeNotes = [];
      storeNotes = JSON.parse(localStorage.getItem('storedNotes')) || [];
      storeNotes.push(this.title);
      localStorage.setItem('storedNotes', JSON.stringify(storeNotes));
    }
  
    remove() {
      const removeNote = document.getElementById("taskList");
      removeNote.removeChild(this);

      const loadNotes = JSON.parse(localStorage.getItem('storedNotes'));
      const index = loadNotes.indexOf(this.innerHTML);
      loadNotes.splice(index, 1);
      localStorage.setItem('storedNotes',JSON.stringify(loadNotes));
    }
  }
  
  class App {
    constructor() {  
      this.txtTodo = document.getElementById("taskInput");
      this.txtTodo.addEventListener("keypress", this.createNote.bind(this));

      this.loadNotesFromStorage();
    }
  
    loadNotesFromStorage() {
      let loadNotes = JSON.parse(localStorage.getItem('storedNotes'));
        loadNotes.forEach(note => {
          const noteLoaded = new Note(note);
          noteLoaded.add();
        })
    }
  
    createNote(e) {
      if(e.key === "Enter"){
        e.preventDefault();
        const note = new Note(this.txtTodo.value);
        note.add();
        this.reset();
        note.saveToStorage();
      }
    }
  
    reset() {
      this.txtTodo.value = "";
    }
  }
  
  let app = new App();
  
class Note {
    constructor(title) {
      this.title = title;
      // HINT🤩 this.element = this.createElement(title);
      this.element = this.createElement(title);
    }
  
    createElement(title) {
      let newNote = document.createElement("li");
      console.log("Note: " + title);
      newNote.innerHTML = title;

      // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));
  
      return newNote;
    }
  
    add() {
      // HINT🤩
      // this function should append the note to the screen somehow
      document.getElementById("taskList").appendChild(this.element);
    }
  
    saveToStorage() {
      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
      let storeNotes = [];
      storeNotes = JSON.parse(localStorage.getItem('storedNotes')) || [];
      storeNotes.push(this.title);
      localStorage.setItem('storedNotes', JSON.stringify(storeNotes));
    }
  
    remove() {
      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element
      // .removeChild(this)
      // remove the item from screen and from localstorage
    }
  }
  
  class App {
    constructor() {
      console.log("👊🏼 The Constructor!");
  
      // HINT🤩
      // pressing the enter key in the text field triggers the createNote function
      this.txtTodo = document.getElementById("taskInput");
      this.txtTodo.addEventListener("keypress", this.createNote.bind(this));

      // when the app loads, we can show previously saved noted from localstorage
      // this.loadNotesFromStorage();
      this.loadNotesFromStorage();
    }
  
    loadNotesFromStorage() {
      console.log('hi');
      // HINT🤩
      // load all notes from storage here and add them to the screen
      let loadNotes = JSON.parse(localStorage.getItem('storedNotes'));
        loadNotes.forEach(note => {
          const noteLoaded = new Note(note);
          noteLoaded.add();
        })
    }
  
    createNote(e) {
      // this function should create a new note by using the Note() class
      // HINT🤩
      // note.add();
      // note.saveToStorage();
      // clear the text field with .reset in this class
      // if (e.key === "Enter")

      if(e.key === "Enter"){
        e.preventDefault();
        const note = new Note(this.txtTodo.value);
        note.add();
        console.log(note);
        this.reset();
        note.saveToStorage();
      }
    }
  
    reset() {
      console.log("reset");
      this.txtTodo.value = "";
    }
  }
  
  let app = new App();
  
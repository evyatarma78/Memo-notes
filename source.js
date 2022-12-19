//saving in values the elements we need
const board = document.querySelector("#note_board");
const content = document.querySelector("#noteTxt");
const time = document.querySelector("#noteTime");
const date = document.querySelector("#noteDate");
const btn = document.querySelector("#addNote");
const search_value = document.querySelector("#search_value");

const loadFromLocalStorage = (key) => {
  //return the elements on json stractcher
  return JSON.parse(localStorage.getItem(key));
};
// savig the parametres in the chrome page +  convert key word to string
const SaveinLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
let notes = loadFromLocalStorage("notes") ? loadFromLocalStorage("notes") : [];
let note_id = loadFromLocalStorage("note_id")
  ? loadFromLocalStorage("note_id")
  : 0;
// function is reciving the object and building a note on page
const addNoteToHtml = (note_obj) => {
  let new_textera = "";
  let new_date = "";
  let new_time = "";

  //creating elements and seting valus
  const note_div = document.createElement("div");

  note_div.classList.add("note");
  const para_content = document.createElement("p");
  para_content.innerHTML = note_obj.content;

  // when client presses the text he can change it
  para_content.addEventListener("click", () => {
    new_textera = document.createElement("textarea");
    new_textera.style.maxWidth = "60%";
    new_textera.append(note_obj.content);
    note_div.replaceChild(new_textera, para_content);

    const update_btn = document.createElement("button");
    update_btn.append("Update Note");
    note_div.replaceChild(update_btn, delete_btn);

    //saving the new note and updating
    update_btn.addEventListener("click", () => {
      notes.find((note) => note.note_id === note_obj.note_id).content =
        new_textera.value;

      // saving the new  note on the localstorage
      SaveinLocalStorage("notes", notes);

      // reset board
      board.innerHTML = "";

      for (let note of notes) {
        adddNoteToHtml(note);
      }
    });
  });
  const para_time = document.createElement("p");

  para_time.innerHTML = note_obj.time;

  para_time.addEventListener("click", () => {
    new_time = document.createElement("input");
    new_time.setAttribute("type", "time");
    new_time.value = "00:00";
    new_time.style.maxWidth = "70px";
    note_div.replaceChild(new_time, para_time);

    const update_btn = document.createElement("button");
    update_btn.append("Update Note");
    note_div.replaceChild(update_btn, delete_btn);

    //saving the new note and updating
    update_btn.addEventListener("click", () => {
      notes.find((note) => note.note_id === note_obj.note_id).time =
        new_time.value;

      // saving the new  note on the localstorage
      SaveinLocalStorage("notes", notes);

      // reset board
      board.innerHTML = "";

      for (let note of notes) {
        addNoteToHtml(note);
      }
    });
  });

  const para_date = document.createElement("p");
  para_date.innerHTML = note_obj.date;

  para_date.addEventListener("click", () => {
    new_date = document.createElement("input");
    new_date.setAttribute("type", "date");
    new_date.style.maxWidth = "70%;";
    new_date.value = para_date.innerHTML;
    note_div.replaceChild(new_date, para_date);

    const update_btn = document.createElement("button");
    update_btn.append("Update Note");
    note_div.replaceChild(update_btn, delete_btn);
    //saving the new note and updating
    update_btn.addEventListener("click", () => {
      notes.find((note) => note.note_id === note_obj.note_id).date =
        new_date.value;

      // saving the new  note on the localstorage
      SaveinLocalStorage("notes", notes);

      // reset board
      board.innerHTML = "";

      for (let note of notes) {
        addNoteToHtml(note);
      }
    });
  });

  const delete_btn = document.createElement("button");
  delete_btn.innerHTML = "Delete Note";
  //adding  elements to the note picture
  note_div.append(para_content, para_date, para_time, delete_btn);

  // add all the input values to the note picture
  board.append(note_div);

  //delete button action
  delete_btn.addEventListener("click", () => {
    note_div.remove();

    notes = notes.filter((note) => note.note_id !== note_obj.note_id);

    //update the arry
    SaveinLocalStorage("notes", notes);
  });
};
//tracking the adding note function
btn.addEventListener("click", () => {
  note_id++;
  // import class from note.js


  //option one
  // const note = {
  //   //creation  order of the note
  //   note_id: note_id,
  //   content: content.value,
  //   time: time.value,
  //   date: date.value,
  // };

//option 2
  const note = new Note(note_id,content.value,time.value,date.value )

  //if one of the values is empty you will get an alert

  // if (content.value = "" || time.value == "" || date.value == "") {
  //   alert("You forgot to fill")
  //   addNoteToHtml() = false;
  // }

  //adding the  new note to the arry
  notes.push(note);
  // saving the new  note on the localstorage
  SaveinLocalStorage("notes", notes);
  // saving the new id on the localstorage
  SaveinLocalStorage("note_id", note_id);

  addNoteToHtml(note);
});

content.value = "";
time.value = "";
date.value = "";

for (let note of notes) {
  addNoteToHtml(note);
}

// search if one of the letters or time or the date answers the client's request
search_value.addEventListener("keyup", () => {
  const filtered_arry = notes.filter(
    (note) =>
      note.content.includes(search_value.value) ||
      note.time.includes(search_value.value) ||
      note.date.includes(search_value.value)
  );
  // reset board
  board.innerHTML = "";

  if (filtered_arry.length > 0) {
    //showing the notes on board loop action
    for (let s_note of filtered_arry) {
      addNoteToHtml(s_note);
    }
  } else {
    // if the arry is empty
    board.innerHTML = "THE NOTES ARE EMPTY";
  }
});



This code represents a note-taking application with functionalities for adding, updating,
and deleting notes. It also includes a search feature to filter notes based on content, time, or date.

The code includes the following elements:
- Variables for referencing the required HTML elements: `board`, `content`, `time`, `date`, `btn`, `search_value`.
- Functions `loadFromLocalStorage(key)` and `SaveinLocalStorage(key, value)`: Used for retrieving and saving data to the browser's local storage.
- Variables `notes` and `note_id` to store and track the notes and their unique IDs.
- Function `addNoteToHtml(note_obj)`: Creates and displays a note on the page based on the provided note object.
- Event listener for the add note button (`btn`) to capture user input, create a new note object, add it to the `notes` array, and save it in local storage. The note is also displayed on the page.
- Event listener for the search input (`search_value`) to filter and display notes based on the search value.
- Initialization code to load existing notes from local storage, display them on the page, and set up event listeners for updating and deleting notes.


// 1. Select elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message"); // NEW
const noteCount = document.querySelector("#note-count"); // NEW

let notes = [];

// 2. Render function
function render() {
  notesList.textContent = "";

  // NEW: Updating the note count message //
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    const headerDiv = document.createElement("div");
    headerDiv.className = "note-header";

    const categorySpan = document.createElement("span");
    categorySpan.className = "category-label";
    categorySpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.textContent = note.createdAt;

    headerDiv.appendChild(categorySpan);
    headerDiv.appendChild(dateSpan);

    const textP = document.createElement("p");
    textP.textContent = note.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // --- NEW: Delete button logic ---
    // When clicked, keep all notes EXCEPT the one with this specific ID
    deleteBtn.addEventListener("click", function () {
      notes = notes.filter((n) => n.id !== note.id);
      render(); // Re-draw the list without the deleted note
    });

    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// 3. Form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // --- NEW: Validation ---
  const text = input.value.trim(); // .trim() removes accidental spaces at the start/end

  // Check if empty
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return; // Stops the function here so the note isn't added
  }

  // Check if too long
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return; // Stops the function here
  }

  // If we pass the checks, clear any existing error messages
  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  input.value = "";
  render();
});

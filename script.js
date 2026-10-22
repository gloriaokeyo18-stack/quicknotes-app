// 1. Select elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input"); // NEW

let notes = [];

// --- NEW: Load notes from localStorage when the page opens ---
const savedNotes = localStorage.getItem("quicknotes-data");
if (savedNotes) {
  notes = JSON.parse(savedNotes); // Convert the string back into a JavaScript array
}

// --- NEW: Helper function to save notes to localStorage ---
function saveNotes() {
  localStorage.setItem("quicknotes-data", JSON.stringify(notes)); // Convert array to string
}

// 2. Render function
function render() {
  notesList.textContent = "";

  // Update the note count message
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

  // --- NEW: Filter notes based on what is typed in the search box ---
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm),
  );

  // --- NEW: Show a message if the search finds nothing ---
  if (filteredNotes.length === 0 && notes.length > 0) {
    const noMatchLi = document.createElement("li");
    noMatchLi.textContent = "No notes match your search.";
    noMatchLi.style.padding = "1rem";
    noMatchLi.style.color = "#666";
    notesList.appendChild(noMatchLi);
    return; // Stop here so it doesn't try to draw empty cards
  }

  // Draw the filtered notes
  filteredNotes.forEach((note) => {
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

    deleteBtn.addEventListener("click", function () {
      notes = notes.filter((n) => n.id !== note.id);
      saveNotes(); // --- NEW: Save to memory after deleting ---
      render();
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

  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  saveNotes(); // --- NEW: Save to memory after adding a new note ---

  input.value = "";
  render();
});

// --- NEW: Re-render the list every time the user types a letter in the search box ---
searchInput.addEventListener("input", function () {
  render();
});

// --- NEW: Draw the notes immediately when the page first loads ---
render();

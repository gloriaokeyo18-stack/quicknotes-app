// 1. Select elements using querySelector
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// 2. Initialize the empty array to store note objects
let notes = [];

// 3. Render function: Rebuilds the list onto the webpage
function render() {
  // Clear the current list out first
  notesList.textContent = "";

  // Loop through our array and create HTML elements for each note
  notes.forEach((note) => {
    // Create the main card container (<li>)
    const li = document.createElement("li");
    // Add the base class AND the specific category class for the colored border
    li.className = `note-card category-${note.category}`;

    // Create header container for category and date
    const headerDiv = document.createElement("div");
    headerDiv.className = "note-header";

    // Create category label
    const categorySpan = document.createElement("span");
    categorySpan.className = "category-label";
    categorySpan.textContent = note.category;

    // Create date label
    const dateSpan = document.createElement("span");
    dateSpan.textContent = note.createdAt;

    // Append category and date to the header
    headerDiv.appendChild(categorySpan);
    headerDiv.appendChild(dateSpan);

    // Create the paragraph for the actual note text
    const textP = document.createElement("p");
    textP.textContent = note.text; // Ensures user input is safe!

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // Assemble the card by appending everything to the <li>
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(deleteBtn);

    // Finally, add the assembled card to the webpage
    notesList.appendChild(li);
  });
}

// 4. Listen for the form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the page from reloading

  // Create the new note object
  const newNote = {
    id: Date.now(), // Creates a unique number based on the exact millisecond
    text: input.value,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(), // Creates a readable date and time string
  };

  // Add it to our array
  notes.push(newNote);

  // Clear the input box for the next note
  input.value = "";

  // Re-render the updated list
  render();
});

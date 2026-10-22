# QuickNotes

QuickNotes is a lightweight, responsive note-taking web application built from scratch using HTML, CSS, and vanilla JavaScript. It allows users to quickly capture ideas, categorize them, and easily retrieve them later. The app focuses on a clean user interface and reliable performance, saving all data directly to the user's browser memory so no notes are ever lost.

## Features

- **Add and Delete Notes:** Users can create notes up to 200 characters and delete them when no longer needed.
- **Categorization:** Notes can be tagged as Personal, Work, or Study, with distinct visual color coding for each.
- **Live Search:** A dynamic search bar filters notes instantly as the user types.
- **Data Persistence:** Notes are automatically saved to `localStorage` and restored when the page is refreshed or reopened.
- **Form Validation:** Prevents submission of empty notes or notes exceeding the character limit, displaying clear error messages.
- **Responsive Design:** The layout automatically adapts to mobile screens using CSS Flexbox and media queries.

## How to Run Locally

1. Clone this repository to your local machine using `git clone https://github.com/gloriaokeyo18-stack/quicknotes-app.git`
2. Navigate into the project folder.
3. Double-click the `index.html` file to open it directly in any modern web browser. No server installation is required.

## What I Learned

Building this project helped me solidify my understanding of front-end web development. Specifically, I learned:

1. How to safely manipulate the DOM using `document.createElement()` and `textContent` instead of `innerHTML` to prevent security vulnerabilities.
2. How to save and retrieve complex JavaScript arrays in the browser using `localStorage`, `JSON.stringify()`, and `JSON.parse()`.
3. How to use CSS Flexbox and media queries to create a layout that looks good on both desktop monitors and small mobile screens.
4. How to manage a structured Git workflow by breaking a project down into distinct, meaningful commits.

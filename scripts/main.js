// Selectors
/** @type {HTMLButtonElement} */
const searchSubmitButton = document.querySelector("[data-search-btn]");
/** @type {HTMLFormElement} */
const searchForm = document.querySelector("[data-search-form]");
/** @type {HTMLInputElement} */
const searchTextBox = document.querySelector("[data-search-text]");
/** @type {HTMLFormElement} */
const newNoteForm = document.querySelector("[data-new-note-form]");
/** @type {HTMLInputElement} */
const newNoteText = document.querySelector("[data-new-note-title-text]");
/** @type {HTMLInputElement} */
const newNoteDescText = document.querySelector(
	"[data-new-note-description-text]"
);
const notesContainerElement = document.querySelector("[data-notes-container]");

/**
 * @typedef {{id: string; title: string; desc: string}} Note
 */

/** @type {Note[]} */
const notes = [];

// add event listener on new-note-form to add a note on submission
newNoteForm.addEventListener("submit", ev => {
	ev.preventDefault();

	// grab the input
	/** @type  {Note}*/
	const note = {
		id: new Date().toISOString(),
		title: newNoteText.value,
		desc: newNoteDescText.value,
	};

	// add the note to screen
	addNoteToScreen(note);

	// add the note to notes array for searching purpose
	notes.push(note);

	// reset the input fields
	newNoteText.value = "";
	newNoteDescText.value = "";
});

function removeNoteFromScreen(id) {
	notesContainerElement.querySelector(`[data-note-id='${id}']`).remove();
}

/**
 * Create a note card on screen and returns newly created note card
 * @param {Note} note
 * @returns {HTMLDivElement} Newly created note card
 */
function addNoteToScreen({ id, title, desc }) {
	notesContainerElement.insertAdjacentHTML(
		"beforeend",
		`
            <div
                class="card card-compact lg:card-normal bg-primary text-primary-content relative overflow-visible"
                data-note-id="${id}"
				>				
                    <button
                        class="btn btn-circle btn-sm bg-black lg:btn-md absolute right-0 top-0 translate-x-1/2 -translate-y-1/2"
                        type="submit"
                        onclick="removeNoteFromScreen('${id}')"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 lg:h-5 lg:w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
            
                    <div class="card-body">
                        <h2 class="card-title lg:text-xl">${title}</h2>
                        <p class="lg:text-lg">${desc}</p>
                    </div>    
            </div>
    `
	);
}

// add event listener to search form to search for notes
searchForm.addEventListener("submit", ev => {
	ev.preventDefault();

	// grab the input
	const queryStr = searchTextBox.value.toLowerCase();

	// if user passes empty string, then show all notes
	if (queryStr === "") {
		notes.forEach(({ id }) => hideNote(id, false));
		return;
	}

	// find notes which do not match the query string and hide them
	const foundNotes = notes.filter(
		({ desc, title }) =>
			!(
				desc.toLowerCase().includes(queryStr) ||
				title.toLowerCase().includes(queryStr)
			)
	);
	foundNotes.forEach(({ id }) => hideNote(id));

	// reset the inputs
	searchTextBox.value = "";
});

function hideNote(id, hide = true) {
	hide
		? notesContainerElement
				.querySelector(`[data-note-id="${id}"]`)
				.classList.add("hidden")
		: notesContainerElement
				.querySelector(`[data-note-id="${id}"]`)
				.classList.remove("hidden");
}

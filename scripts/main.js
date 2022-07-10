let noteCount = 1;

const submitButton = document.querySelector(".submit-btn");
submitButton.addEventListener("click", () => {
    // grab the input
    const noteTitleTag = document.querySelector("#note-title");
    const noteTextarea = document.querySelector("#note-input");
    const input = noteTextarea.value;
    const noteTitle = noteTitleTag.value;
    noteTextarea.value = '';    // clear the input
    noteTitleTag.value = '';


    const card = makeNotesCard(noteTitle, input);
    const notesContainer = document.querySelector(".notes");
    notesContainer.appendChild(card);
});

function makeNotesCard(title, body) {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = title;
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = body;
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary")
    button.setAttribute("type", "button");
    button.textContent = "Delete Note"
    button.addEventListener("click", e => {
        e.target.parentNode.parentNode.remove();
    });
    cardBody.append(h5, p, button);


    const card = document.createElement("div");
    card.classList.add("card", "note-cards");
    card.appendChild(cardBody);

    return card;
}

// making the search work
const searchSubmit = document.querySelector(".search-submit")
searchSubmit.addEventListener("click", () => {
    // get the search input
    const searchInput = document.querySelector(".search-text").value;

    // search in each card individually
    const cards = document.querySelectorAll(".note-cards");
    cards.forEach(card => {
        // checking the note and note title, for search query
        const title = card.firstElementChild.children[0].textContent;
        const description = card.firstElementChild.children[1].textContent;
        if (!(title.includes(searchInput) || description.includes(searchInput))) {
            card.style.display = "none";
        }
    });
});

searchSubmit.addEventListener("focusout", () => {
    document.querySelectorAll(".note-cards").forEach(card => {
        card.style.display = "block";
    });
});




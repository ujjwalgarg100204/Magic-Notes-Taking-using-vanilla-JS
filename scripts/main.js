let noteCount = 1;

const submitButton = document.querySelector(".submit-btn");
submitButton.addEventListener("click", () => {
    // grab the input
    const noteTextarea = document.querySelector(".note-input");
    const input = noteTextarea.value;
    noteTextarea.value = '';    // clear the input

    const card = makeNotesCard(`Note ${noteCount++}`, input);
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
        if (!(card.firstElementChild.children[1].textContent.includes(searchInput))) {
            card.style.display = "none";
        }
    });
});

searchSubmit.addEventListener("focusout", () => {
    document.querySelectorAll(".note-cards").forEach(card => {
        card.style.display = "block";
    });
});




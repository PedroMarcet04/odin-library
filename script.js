const libraryContainer = document.getElementById("library");
const addNewBookButton = document.getElementById("add-book");
const addNewBookForm = document.getElementById("add-book-form");
const closeNewBookForm = document.getElementById("close-book-form");

const readStatusSVG = {
    read: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye-check-outline</title><path d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.65 22.44,13.26 22.08,13.85C21.5,13.5 20.86,13.25 20.18,13.12L20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12C4.83,15.36 8.24,17.5 12,17.5L13.21,17.43C13.07,17.93 13,18.46 13,19V19.46L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5Z" /></svg>`,
    notRead: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye-off-outline</title><path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" /></svg>`,
}
const deleteSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`;

let library = [];

const Book = function(title, author, numOfPages, isRead) {
    if (!new.target) throw Error("Failed to instantiate (add 'new')");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.isRead?"has been read":"not read yet"}`;
    }
}

const addBookToLibrary = function(title, author, numOfPages, isRead) {
    const book = new Book(title, author, numOfPages, isRead);
    library.push(book);
}

const displayBook = function(book) {
    console.log(`Displaying book ${book.id}`);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.id = book.id;

        const titleH2 = document.createElement("h2");
        titleH2.classList.add(".title");
        titleH2.textContent = book.title;
        bookDiv.appendChild(titleH2);

        const authorH3 = document.createElement("h3");
        authorH3.classList.add(".author");
        authorH3.textContent = `by ${book.author}`;
        bookDiv.appendChild(authorH3);

        const numOfPagesP = document.createElement("p");
        numOfPagesP.classList.add(".num-of-pages");
        numOfPagesP.textContent = `${book.numOfPages} pages`;
        bookDiv.appendChild(numOfPagesP);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons");

            const toggleReadButton = document.createElement("button");
            toggleReadButton.classList.add("toggle-read");
            toggleReadButton.innerHTML =
                readStatusSVG[
                    book.isRead?"read":"notRead"
                ];
            buttonsDiv.appendChild(toggleReadButton);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.innerHTML = deleteSVG;
            deleteButton.addEventListener("click", function() {
                console.log(`Deleting if id=${book.id}`);
                library = library.filter((libBook) => libBook.id!=book.id);
                displayLibrary();
            });
            buttonsDiv.appendChild(deleteButton);

        bookDiv.appendChild(buttonsDiv);

    libraryContainer.insertBefore(bookDiv, addNewBookButton);
}

const displayLibrary = function() {
    libraryContainer.replaceChildren(addNewBookButton);
    for (book of library) displayBook(book);
} 

// library.push(new Book("Minecraft", "Steve", 67, false));
// library.push(new Book("Sample", "Smith", 69, true));
// library.push(new Book("Minecraft", "Steve", 67, false));
// library.push(new Book("Sample", "Smith", 69, true));
// library.push(new Book("Minecraft", "Steve", 67, false));
// library.push(new Book("Sample", "Smith", 69, true));
// library.push(new Book("Minecraft", "Steve", 67, false));
// library.push(new Book("Sample", "Smith", 69, true));

displayLibrary();

addNewBookButton.addEventListener(
    "click", 
    () => addNewBookForm.classList.toggle("hide")
);
closeNewBookForm.addEventListener(
    "click", 
    () => addNewBookForm.classList.toggle("hide")
);
addNewBookForm.addEventListener(
    "submit",
    function(e) {
        e.preventDefault();
        
        const formData = new FormData(addNewBookForm);
        
        const data = Object.fromEntries(formData.entries());

        const title = data["book-title-input"];
        const author = data["book-author-input"];
        const numOfPages = data["book-num-of-pages-input"];
        const isRead = data["book-is-read-input"];
        addBookToLibrary(title, author, numOfPages, isRead);

        console.log("Added book");
        console.log(library);

        displayLibrary();
    }
);


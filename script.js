const library = [];

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
    library.push(new Book(title, author, numOfPages, isRead));
}



console.log(new Book("Minecraft", "Steve", 67, false).info());
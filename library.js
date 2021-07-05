Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [(dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm,
            this.getFullYear()].join('/');
  };

let library = [];

function Book(name, author, publishDate, numPages) {
    this.name = name;
    this.author = author;
    this.publishDate = publishDate;
    this.numPages = numPages;
    this.readStatus = false;
}

function addBookToLibrary(name, author, publishDate, numPages) {
    let book = new Book(name, author, publishDate, numPages);
    library.push(book);
}

function displayBooksInLibrary() {
    let display = document.getElementById("book-display");
    for (let i = 0; i < library.length; i++) {
        let book = document.createElement("div");
        book.setAttribute("class", "book-table-item");
        book.setAttribute("id", library[i].name);

        addAttributesToBookEntry(book, library[i]);
        addReadToggleBtn(book);
        addRemoveBookBtn(book);

        display.appendChild(book);
    }

    document.documentElement.style.setProperty("--rowNum", library.length);
}

function addReadToggleBtn(book) {
    let toggleReadStatus = document.createElement("BUTTON");
    toggleReadStatus.setAttribute("class", "toggle-read-btn");
    toggleReadStatus.innerText = "Toggle Read Status";
    book.appendChild(toggleReadStatus);
}

function addRemoveBookBtn(book) {
    let removeBookBtn = document.createElement("BUTTON");
    removeBookBtn.setAttribute("class", "remove-book-btn");
    removeBookBtn.innerText = "Remove Book";
    book.appendChild(removeBookBtn);
}

function addAttributesToBookEntry(bookEntry, book) {
    let bookName = document.createElement("p");
    bookName.innerText = book.name;
    let bookAuthor = document.createElement("p");
    bookAuthor.innerText = book.author;
    let bookPublishDate = document.createElement("p");
    bookPublishDate.innerText =
            book.publishDate.yyyymmdd();
    let bookPages = document.createElement("p");
    bookPages.innerText = book.numPages;
    let bookRead = document.createElement("p");
    let readStatus = book.readStatus;
    bookRead.innerText = readStatus ? "Read" : "Not Read Yet";

    bookEntry.appendChild(bookName);
    bookEntry.appendChild(bookAuthor);
    bookEntry.appendChild(bookPublishDate);
    bookEntry.appendChild(bookPages);
    bookEntry.appendChild(bookRead);
}

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', newBook);

function newBook(event) {
        
}

addBookToLibrary("Clean Code", "author", new Date(2008, 7, 1), 800);
addBookToLibrary("The Pragmatic Programmer", "author", new Date(1999, 9, 1), 750);

displayBooksInLibrary();

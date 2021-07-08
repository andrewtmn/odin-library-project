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

// Displays any books in library that haven't been displayed yet.
// Global variable count keeps track of this. 
function displayBooksInLibrary() {
    console.log('called');
    let display = document.getElementById("book-display");
    
    // clear everything except headers
    let headers = display.firstElementChild;
    display.innerHTML = '';
    display.appendChild(headers);

    for (let i = 0; i < library.length; i++) {
        let book = document.createElement("div");
        book.setAttribute("class", "book-table-item");
        book.setAttribute("id", library[i].name);
        book.setAttribute("data-index", i);

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
    toggleReadStatus.innerText = "Read";
    book.appendChild(toggleReadStatus);
}

function addRemoveBookBtn(book) {
    let removeBookBtn = document.createElement("BUTTON");
    removeBookBtn.setAttribute("class", "remove-book-btn");
    removeBookBtn.innerText = "Remove";
    book.appendChild(removeBookBtn);
}

function addAttributesToBookEntry(bookEntry, book) {
    let bookName = document.createElement("p");
    bookName.setAttribute("class", "book-name");
    bookName.innerText = book.name;
    let bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", "author");
    bookAuthor.innerText = book.author;
    let bookPublishDate = document.createElement("p");
    bookPublishDate.setAttribute("class", "publish-date");
    if (book.publishDate instanceof Date) {
        bookPublishDate.innerText = book.publishDate.yyyymmdd();
    } else {
        bookPublishDate.innerText = book.publishDate;
    }
    let bookPages = document.createElement("p");
    bookPages.setAttribute("class", "num-pages");
    bookPages.innerText = book.numPages;
    let bookRead = document.createElement("p");
    bookRead.setAttribute("class", "read-status");
    let readStatus = book.readStatus;
    bookRead.innerText = readStatus ? "Read" : "Not Read Yet";

    bookEntry.appendChild(bookName);
    bookEntry.appendChild(bookAuthor);
    bookEntry.appendChild(bookPublishDate);
    bookEntry.appendChild(bookPages);
    bookEntry.appendChild(bookRead);
}

document.getElementById("submit").onclick = addNewBook;

function addNewBook() {
    let name = document.getElementById("name");
    let author = document.getElementById("author");
    let date = document.getElementById("date");
    let pages = document.getElementById("pages");
    addBookToLibrary(name.value, author.value, date.value, pages.value);

    reloadTable();

    // clear the form
    name.value = '';
    author.value = '';
    date.value = '';
    pages.value = '';
    closeForm();
}

function reloadTable() {
    displayBooksInLibrary();
    addReadToggleHandler();
    addRemoveBookHandler();
}

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', openForm);

const cancelBtn = document.getElementById("cancel-new-book");
cancelBtn.addEventListener('click', closeForm);

function openForm() {
    document.getElementById("new-book-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("new-book-popup").style.display = "none";
}

function addReadToggleHandler() {
    let readBtns = document.getElementsByClassName("toggle-read-btn");
    console.log(readBtns);
    for (let i = 0; i < readBtns.length; i++) {
        console.log('adding event listener to book');
        readBtns[i].addEventListener('click', function() {
            console.log("before toggle");
            toggleReadStatus(readBtns[i]);
        });
    }
}

function toggleReadStatus(btn) {
    let book = btn.parentElement;
    let read = book.querySelector('.read-status');
    console.log(read);
    if (read.innerText == "Not Read Yet") {
        read.innerText = "Read";
    } else {
        read.innerText = "Not Read Yet";
    }
}

function addRemoveBookHandler() {
    let removeBtns = document.getElementsByClassName("remove-book-btn");
    console.log
    for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', function() {
            removeBook(removeBtns[i]);
        });
    }
}

function removeBook(removeBtn) {
    let book = removeBtn.parentElement;
    let index = book.dataset.index;
    library = library.slice(0, index).concat(library.slice(index+1));
    reloadTable();
}

addBookToLibrary("Clean Code", "author", new Date(2008, 7, 1), 800);
addBookToLibrary("The Pragmatic Programmer", "author", new Date(1999, 9, 1), 750);

reloadTable();

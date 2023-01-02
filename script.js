let idSeed = 0;
let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;

  this.toggleRead = function () {
    this.isRead = !this.isRead;
  };

  this.info = function () {
    if (this.isRead) {
      return `${this.title} by ${this.author}, ${this.pages} pages, already read.`;
    } else {
      return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
    }
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  const books = document.getElementById("bookList");
  books.appendChild(createBookCard(book));

  const readBtn = document.getElementById(`read-${book.id}`);
  readBtn.addEventListener("click", () => {
    const id = parseInt(readBtn.id.split("-")[1]);
    const book = myLibrary.filter((x) => x.id === id)[0];
    book.toggleRead();
    const cardBody = document.getElementById(`book-info-${id}`);
    cardBody.textContent = book.info();
    if (book.isRead) {
      readBtn.textContent = "Unread";
    } else {
      readBtn.textContent = "Read";
    }
  });

  const removeBtn = document.getElementById(`remove-${book.id}`);
  removeBtn.addEventListener("click", () => {
    const id = parseInt(removeBtn.id.split("-")[1]);
    myLibrary = myLibrary.filter((x) => x.id !== id);
    const bookCard = document.getElementById(`book-${id}`);
    bookCard.remove();
  });
}

function createBookCard(book) {
  const innerHtml = `<div class="card">
    <div class="card-title">${book.title}</div>
    <div class="card-body" id="book-info-${book.id}">${book.info()}</div>
    <div class="card-footer">
        <button class="btn btn-primary" id="read-${book.id}">Read</button>
        <button class="btn btn-danger" id="remove-${book.id}">Remove</button>
    </div>
</div>`;
  const divCard = document.createElement("div");
  divCard.id = `book-${book.id}`;
  divCard.innerHTML = innerHtml;
  return divCard;
}

document.getElementById("newBook").addEventListener("click", () => {
  document.getElementById("new-book-dialog").showModal();
});

const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", () => {
  const bookName = document.getElementById("bookName").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const bookPages = document.getElementById("bookPages").value;
  const book = new Book(bookName, bookAuthor, bookPages);
  idSeed += 1;
  book.id = idSeed;
  addBookToLibrary(book);
});

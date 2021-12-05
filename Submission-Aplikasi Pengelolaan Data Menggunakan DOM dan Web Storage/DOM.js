const INCOMPLETE_BOOKS_LIST = "incompleteBookshelfList";
const COMPLETE_BOOKS_LIST = "completeBookshelfList";
const BOOK_ID = "itemId";

const placeholderTittle =
  document.getElementsByClassName("input")[0].childNodes[3];
placeholderTittle.setAttribute("placeholder", "Masukkan Judul Buku");
const placeholderAuthor =
  document.getElementsByClassName("input")[1].childNodes[3];
placeholderAuthor.setAttribute("placeholder", "Masukkan Nama Penulis");
const placeholderYear =
  document.getElementsByClassName("input")[2].childNodes[3];
placeholderYear.setAttribute("placeholder", "Masukkan Tahun Terbit");
const placeholderSearch = document.getElementById("searchBook").childNodes[3];
placeholderSearch.setAttribute("placeholder", "Masukkan Judul Buku");

function addBooks() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookTitleAttribute = document.getElementById("inputBookTitle");
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

  const book = createBooks(bookTitle, bookAuthor, bookYear, bookIsComplete);

  const uncompletedBooksList = document.getElementById(INCOMPLETE_BOOKS_LIST);
  const completedBooksList = document.getElementById(COMPLETE_BOOKS_LIST);

  const bookObj = composeBookObj(
    bookTitle,
    bookAuthor,
    bookYear,
    bookIsComplete
  );

  book[BOOK_ID] = bookObj.id;
  books.push(bookObj);

  if (bookIsComplete) {
    completedBooksList.append(book);
  } else {
    uncompletedBooksList.append(book);
  }

  updateStorage();
}

function createBooks(bookTitle, bookAuthor, bookYear, bookIsComplete) {
  const main = document.createElement("article");
  main.classList.add("book_item");

  const textTitle = document.createElement("h3");
  textTitle.innerText = bookTitle;
  const textAuthor = document.createElement("p");
  textAuthor.innerText = bookAuthor;
  const textYear = document.createElement("p");
  textYear.innerText = bookYear;

  main.append(textTitle, textAuthor, textYear);

  const action = document.createElement("div");
  action.classList.add("action");

  if (bookIsComplete) {
    action.append(undoButton(), trashButton());
  } else {
    action.append(checkButton(), trashButton());
  }

  main.append(action);

  return main;
}

function createButtons(buttonTypeClass, eventListener, textButton) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = textButton;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function addToCompleteBooks(bookDocuments) {
  const completedBooksList = document.getElementById(COMPLETE_BOOKS_LIST);
  const textTitle = bookDocuments.querySelector(".book_item > h3").innerText;
  const textAuthor =
    bookDocuments.querySelectorAll(".book_item > p")[0].innerText;
  const textYear =
    bookDocuments.querySelectorAll(".book_item > p")[1].innerText;

  const completeBooks = createBooks(textTitle, textAuthor, textYear, true);

  const book = searchBookFromStorage(bookDocuments[BOOK_ID]);
  book.isComplete = true;

  completeBooks[BOOK_ID] = book.id;
  completedBooksList.append(completeBooks);

  bookDocuments.remove();

  updateStorage();
}

function removeBooks(bookDocuments) {
  const isDelete = window.confirm(
    "Apakah Anda yakin ingin menghapus buku ini dari rak anda???"
  );
  if (isDelete) {
    const bookPosition = searchBookIndexFromStorage(bookDocuments[BOOK_ID]);
    books.splice(bookPosition, 1);

    bookDocuments.remove();
    updateStorage();
    alert("Buku dihapus !!!!");
  } else {
    alert("Buku gagal dihapus !!!!");
  }
}

function undoBook(bookDocuments) {
  const uncompletedBooksList = document.getElementById(INCOMPLETE_BOOKS_LIST);

  const textTitle = bookDocuments.querySelector(".book_item > h3").innerText;

  const textAuthor =
    bookDocuments.querySelectorAll(".book_item > p")[0].innerText;
  const textYear =
    bookDocuments.querySelectorAll(".book_item > p")[1].innerText;

  const uncompleteBooks = createBooks(textTitle, textAuthor, textYear, false);
  const unbook = searchBookFromStorage(bookDocuments[BOOK_ID]);
  unbook.isComplete = false;
  uncompleteBooks[BOOK_ID] = book.id;

  uncompletedBooksList.append(uncompleteBooks);
  bookDocuments.remove();

  updateStorage();
}

function searchBooks() {
  const searchBooks = document.getElementById("searchBookTitle");
  const filter = searchBooks.value.toUpperCase();
  const bookItem = document.querySelectorAll(
    "section.book_shelf > .book_list > .book_item"
  );
  for (let i = 0; i < bookItem.length; i++) {
    txtValue = bookItem[i].textContent || bookItem[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      bookItem[i].style.display = "";
    } else {
      bookItem[i].style.display = "none";
    }
  }
}

function checkButton2() {
  const span = document.querySelector("span");
  const bookIsComplete = document.getElementById("inputBookIsComplete").checked;
  if (bookIsComplete) {
    span.innerText = "Selesai dibaca";
  } else {
    span.innerText = "Belum selesai dibaca";
  }
}

function undoButton() {
  return createButtons(
    "green",
    function (event) {
      undoBook(event.target.parentElement.parentElement);
    },
    "Belum selesai"
  );
}

function trashButton() {
  return createButtons(
    "red",
    function (event) {
      removeBooks(event.target.parentElement.parentElement);
    },
    "Hapus buku"
  );
}

function checkButton() {
  return createButtons(
    "green",
    function (event) {
      addToCompleteBooks(event.target.parentElement.parentElement);
    },
    "Selesai dibaca"
  );
}

const STORAGE_KEY = "BOOKSHELF_APPS_DICODING";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser Anda tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateStorage() {
  if (isStorageExist()) saveData();
}

function composeBookObj(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function searchBookFromStorage(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function searchBookIndexFromStorage(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

function refreshDataFromBooks() {
  const incompleteBookshelfList = document.getElementById(
    INCOMPLETE_BOOKS_LIST
  );
  const completeBookshelfList = document.getElementById(COMPLETE_BOOKS_LIST);

  for (book of books) {
    const newBook = createBooks(
      book.title,
      book.author,
      book.year,
      book.isComplete
    );
    newBook[BOOK_ID] = book.id;

    if (book.isComplete) {
      completeBookshelfList.append(newBook);
    } else {
      incompleteBookshelfList.append(newBook);
    }
  }
}

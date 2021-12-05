document.addEventListener("DOMContentLoaded", function () {
  const inputBook = document.getElementById("inputBook");
  const searchBook = document.getElementById("searchBook");
  const bookIsComplete = document.getElementById("inputBookIsComplete");

  inputBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBooks();
  });

  searchBook.addEventListener("keyup", function (event) {
    event.preventDefault();
    searchBooks();
  });

  searchBook.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBooks();
  });

  bookIsComplete.addEventListener("input", function (event) {
    event.preventDefault();
    checkButton2();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Buku disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

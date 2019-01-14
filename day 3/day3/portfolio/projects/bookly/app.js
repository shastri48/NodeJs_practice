var bookList = document.querySelector("#book-list ul");
var bookItem = document.querySelector(".bookItem");
var addButton = document.querySelector("button");
var hideBooks = document.querySelector("#hide");
var searchBooks = document.querySelector("#search-books [type=text]");  

var books = JSON.parse(localStorage.getItem('bookData')) || [];


function displayBook(data = []) {
  bookList.innerHTML = "";
  data.forEach((value, index) => {
    bookList.innerHTML += `<li> ${value} 
    <button class="delete" data-index = ${index}>Del</button>
    </li>`;
  });
  localStorage.setItem("bookData", JSON.stringify(books));
}
function addBook(e) {
  e.preventDefault();
  books.push(bookItem.value);
  displayBook(books);
  bookItem.value = "";

}
function removeBook(e) {
  let index = e.target.dataset.index;
  if(e.target.className == "delete"){
    books.splice(index, 1);
    displayBook(books);
  }
}
function hideAll(e) {
  if(e.target.checked == true) {
    bookList.innerHTML = "";
  } else if(e.target.checked ==  false){
    displayBook(books);
  }
}
function search(e) {
  let searchText = e.target.value.toLowerCase();
  var newArray = books.filter(v => v.toLowerCase().includes(searchText));
  displayBook(newArray);

}


displayBook(books);
searchBooks.addEventListener("keyup", search);
hideBooks.addEventListener("click", hideAll);
addButton.addEventListener("click", addBook);
bookList.addEventListener("click", removeBook);

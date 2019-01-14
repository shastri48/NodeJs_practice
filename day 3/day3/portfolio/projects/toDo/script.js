var inputText = document.querySelector(".inputText");
var addButton = document.querySelector(".button");
var container = document.querySelector(".container");
var ul = document.createElement("ul");
container.appendChild(ul);
ul.className = "lists";

function addItem(){
  if(!inputText.value) return;
  var value = inputText.value;
  var li = document.createElement("li");
  li.textContent = value;
  ul.appendChild(li);
  inputText.value = "";
}
addButton.addEventListener("click", addItem);
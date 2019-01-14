var inputPlayer1 = document.querySelector("#player1");
var btnPlayer1 = document.querySelector("#btn-player1");
var inputPlayer2 = document.querySelector("#player2");
var btnPlayer2 = document.querySelector("#btn-player2");
var displayPlayer1 = document.querySelector(".display__player1");
var displayPlayer2 = document.querySelector(".display__player2")


var dataStore1;
var dataStore2;

function dataPlayer1(event) {
  event.preventDefault();
var data = fetch(`https://api.github.com/users/${inputPlayer1.value}`).then(d => d.json()).then(d => {dataStore1 = d}).then(displaydata1)
}


function dataPlayer2(event) {
  event.preventDefault();
var data = fetch(`https://api.github.com/users/${inputPlayer2.value}`).then(d => d.json()).then(d => {dataStore2 = d}).then(displaydata2)
}

function displaydata1(){
  if(!inputPlayer1.value) return;
  var img = document.createElement("img");
  img.setAttribute("src", `${dataStore1.avatar_url}`);
  displayPlayer1.appendChild(img);
  var h3 = document.createElement("h3");
  h3.textContent = `Name: ${dataStore1.name}`;
  displayPlayer1.appendChild(h3);
  var repos = document.createElement("h3")
  repos.textContent = `Repos: ${dataStore1.public_repos}`;
  displayPlayer1.appendChild(repos);
  var followers = document.createElement("h3")
  followers.textContent = `Followers: ${dataStore1.followers
  }`;
  displayPlayer1.appendChild(followers);
  player1Form.style.display = "none";
  player2Form.style.display = "block";
}
function displaydata2(){
  if(!inputPlayer2.value) return;
  var img = document.createElement("img");
  img.setAttribute("src", `${dataStore2.avatar_url}`);
  displayPlayer2.appendChild(img);
  var h3 = document.createElement("h3");
  h3.textContent = `Name: ${dataStore2.name}`;
  displayPlayer2.appendChild(h3);
  var repos = document.createElement("h3")
  repos.textContent = `Repos: ${dataStore2.public_repos}`;
  displayPlayer2.appendChild(repos);
  var followers = document.createElement("h3")
  followers.textContent = `Followers: ${dataStore2.followers}`;
  displayPlayer2.appendChild(followers);
  player2Form.style.display = "none";
  if(dataStore1.name){
    start__battle.style.display = "block";
  }
  start__battle.addEventListener("click", ()=> {
    battleValue1 = (dataStore1.public_repos + (dataStore1.followers * 2));
    battleValue2 = (dataStore2.public_repos + (dataStore2.followers * 2));
    var winText = document.createElement("h4");
    if(battleValue1 > battleValue2){
      winText.textContent = `${dataStore1.name} won the battle`;
    } else if(battleValue2 > battleValue1){
      winText.textContent = `${dataStore2.name} won the battle`;
    } else {
      winText.textContent = `None won the battle. Game draw!!`;
    }
    winner.appendChild(winText);
  })
}



btnPlayer1.addEventListener("click", dataPlayer1);
btnPlayer2.addEventListener("click", dataPlayer2);
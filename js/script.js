var plateauElement = document.getElementById("plateau");
var scoresElement = document.getElementById("scores");
var launchElement = document.getElementById("buttonLaunch");
var buyElement = document.getElementById("buy");
var playerPane = document.getElementById("playerPane");
var playerPaneName = playerPane.querySelector(".name");
var playerPaneProperties = playerPane.querySelector(".properties");
var usernameSelectPane = document.getElementById("usernameSelect");
var launchGameButton = document.getElementById("launchGame");
var maxPlayersElements = document.querySelectorAll(".maxPlayers");
var playersCountElements = document.querySelectorAll(".playersCount");
var playersInQueueListElement = document.getElementById("playersInQueueList");
var joinForm = document.querySelector("#usernameSelect form");
var logElement = document.getElementById("logs");

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let cardsObject = JSON.parse(this.responseText);
    new Monopoly(cardsObject);
  }
};
xmlhttp.open("GET", "/game.json", true);
xmlhttp.send();

function gameLog(callback) {
  let e = document.createElement("p");
  callback(e);
  logElement.appendChild(e);
  logElement.scrollTop = logElement.scrollHeight;
}

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
var houseButton = document.getElementById("house");
var overlay = document.getElementById("overlay");
var overlayTitle = document.getElementById("overlay_title");
var overlayMessage = document.getElementById("overlay_message");
var overlayButton = document.getElementById("overlay_close");
var diceNumber = document.getElementById("dice_number");

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let cardsObject = JSON.parse(this.responseText);
    new Monopoly(cardsObject);
  }
};
xmlhttp.open("GET", "../game.json", true);
xmlhttp.send();

function gameLog(callback) {
  let e = document.createElement("p");
  callback(e);
  logElement.appendChild(e);
  logElement.scrollTop = logElement.scrollHeight;
}

let overlayCallback = null;
function showOverlay(title, message, quitButton, callback) {
  overlay.classList.add("show");
  overlayTitle.innerText = title;
  overlayMessage.innerText = message;
  if (quitButton) {
    overlayButton.innerText = quitButton;
    if (callback) {
      overlayCallback = callback;
    }
  }
}
overlayButton.addEventListener("click", () => {
  overlay.classList.remove("show");
  overlayTitle.innerText = "";
  overlayMessage.innerText = "";
  overlayButton.innerText = "";
  if (overlayCallback) {
    overlayCallback();
    overlayCallback = null;
  }
});

var cardsObject = {};
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    cardsObject = JSON.parse(this.responseText);
    start();
  }
};
xmlhttp.open("GET", "/game.json", true);
xmlhttp.send();

var game;
var plateauElement = document.getElementById("plateau");
var scoresElement = document.getElementById("scores");
var launchElement = document.getElementById("buttonLaunch");
var buyElement = document.getElementById("buy");
function start() {
  game = new Game(2);

  launchElement.addEventListener("click", game.playRandom);
  buyElement.addEventListener("click", game.buy);
}

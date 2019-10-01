class Player {

  constructor(name, money, game) {
    this.money = money;
    this.case = 0;
    this.game = game;
//    console.log(game.plateau.getCardAt(this.case));
    let player = document.createElement("div");
    player.classList.add("player");
    plateauElement.appendChild(player);
    this.element = player;

    let score = document.createElement("div");
    score.innerText = name + " : " + money + "€";
    scoresElement.appendChild(score);
  }
}

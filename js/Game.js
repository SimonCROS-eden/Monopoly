class Game {

  actualPlayerIndex = -1;

  constructor(players) {
    this.players = [];
    this.plateau = new Plateau(cardsObject.size);

    for (let i = 0; i < players; i++) {
      this.players.push(new Player(i, 50000, cardsObject.players[i], this));
    }
    this.actualPlayer = players[0];
  }

  playRandom = () => {
    buyElement.disabled = true;
    this.nextPlayer();
    let number = Math.floor(Math.random() * (cardsObject.maxDiceScore - 1 + 1)) + 1;
    this.players[this.actualPlayerIndex].forward(number);
  }

  buy = () => {
    this.players[this.actualPlayerIndex].buy();
    buyElement.disabled = true;
  }

  nextPlayer() {
    this.actualPlayerIndex++;
    if (this.actualPlayerIndex >= this.players.length) this.actualPlayerIndex = 0;
  }
}

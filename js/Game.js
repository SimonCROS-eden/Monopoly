class Game {

  actualPlayerIndex = -1;
  startValue = 0;
  caseNumber = 0;

  constructor(players) {
    this.players = [];
    this.startValue = cardsObject.startValue;
    this.caseNumber = (cardsObject.size - 1) * 4;
    this.plateau = new Plateau(cardsObject.size, this);

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

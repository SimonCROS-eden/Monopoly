class Game {

  actualPlayerIndex = -1;
  startValue = 0;
  caseNumber = 0;
  gameRules = {};

  constructor(players, gameRules) {
    this.players = [];
    this.startValue = gameRules.startValue;
    this.caseNumber = (gameRules.size - 1) * 4;
    this.gameRules = gameRules;
    this.plateau = new Plateau(gameRules.size, this.gameRules);

    launchElement.addEventListener("click", this.playRandom);
    buyElement.addEventListener("click", this.buy);
    houseButton.addEventListener("click", this.addHouse);

    for (let i = 0; i < players.length; i++) {
      this.players.push(new Player(players[i], this.gameRules.startMoney, gameRules.players[i], this));
    }
    this.actualPlayer = players[0];
    this.players[0].reloadPane();
  }

  playRandom = () => {
    buyElement.disabled = true;
    houseButton.disabled = true;
    this.nextPlayer();
    let number = Math.floor(Math.random() * (this.gameRules.maxDiceScore - 1 + 1)) + 1;
    this.players[this.actualPlayerIndex].forward(number);
  }

  buy = () => {
    this.players[this.actualPlayerIndex].buy();
    buyElement.disabled = true;
  }

  addHouse = () => {
    this.players[this.actualPlayerIndex].house();
  }

  nextPlayer() {
    this.actualPlayerIndex++;
    if (this.actualPlayerIndex >= this.players.length) this.actualPlayerIndex = 0;
    this.players[this.actualPlayerIndex].reloadPane();
  }

  getLuckCard() {

  }
}

class Game {

  actualPlayerIndex = -1;
  startValue = 0;
  caseNumber = 0;
  gameRules = {};
  lucks = [];
  boxs = [];
  replayBool = false;

  constructor(players, gameRules) {
    this.players = [];
    this.startValue = gameRules.startValue;
    this.caseNumber = (gameRules.size - 1) * 4;
    this.gameRules = gameRules;
    this.plateau = new Plateau(gameRules.size, this.gameRules);
    this.lucks = this.gameRules.lucks;
    this.boxs = this.gameRules.boxs;

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
    if (!this.replayBool) {
      this.nextPlayer();
    }
    this.replayBool = false;
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
    let luck = this.lucks[Math.floor(Math.random()*this.lucks.length)];
    showOverlay("Carte chance", luck.message, "Ok !", () => {
      if (luck.action == "give") {
        this.players[this.actualPlayerIndex].addMoney(luck.value);
      } else if (luck.action == "lose") {
        this.players[this.actualPlayerIndex].removeMoney(luck.value);
      } else if (luck.action == "move") {
        this.players[this.actualPlayerIndex].move(luck.value);
      }
    });
  }

  replay() {
    this.replayBool = true;
  }

  lose() {
    for (let p of this.players) {
      if (p.money <= 0) {
        this.players.splice(this.players.indexOf(p), 1);
        if (this.players.length == 1) {
          break;
        }
      }
    }
    if (this.players.length == 1) {
      showOverlay("Gagné", this.players[0] + " a gagné !!!");
    }
  }

  getBoxCard() {
    let box = this.boxs[Math.floor(Math.random()*this.boxs.length)];
    showOverlay("Caisse de communauté", box.message, "Ok !", () => {
      if (box.action == "give") {
        this.players[this.actualPlayerIndex].addMoney(box.value);
      } else if (box.action == "lose") {
        this.players[this.actualPlayerIndex].removeMoney(box.value);
      } else if (box.action == "move") {
        this.players[this.actualPlayerIndex].move(box.value);
      }
    });
  }
}

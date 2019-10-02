class Player {

  properties = {};

  constructor(name, money, color, game) {
    this.name = name;
    this.game = game;
    this.money = money;
    this.caseIndex = 0;
    this.case = this.game.plateau.getCaseAt(this.caseIndex);
    let player = document.createElement("div");
    player.classList.add("player");
    player.style.backgroundColor = color;
    plateauElement.appendChild(player);
    this.element = player;
    let score = document.createElement("div");
    score.innerText = name + " : " + money + "€";
    scoresElement.appendChild(score);
    this.moneyElement = score;
    this.reload();
  }

  removeMoney(amount) {
    this.money -= amount;
  }

  addMoney(amount) {
    this.money += amount;
  }

  addProperty(property) {
    if (!this.properties[property.group]) {
      this.properties[property.group] = [];
    }
    this.properties[property.group].push(property);
    this.reloadPane();
  }

  reloadPane() {
    playerPaneName.innerText = this.name;
    playerPaneProperties.innerHTML = "";
    for (let key of Object.keys(this.properties).sort()) {
      for (let p of this.properties[key]) {
        playerPaneProperties.appendChild(p.getElement(true));
      }
    }
  }

  reload() {
    this.moneyElement.innerText = this.name + " : " + this.money + "€";
    this.element.style.left = (this.case.element.offsetLeft + this.case.element.clientWidth / 2 - this.element.clientWidth / 2) + "px";
    this.element.style.top = (this.case.element.offsetTop + this.case.element.clientHeight / 2 - this.element.clientHeight / 2) + "px";
  }

  buy() {
    if (this.case.isBuyable()) {
      this.case.buy(this);
      this.reload();
    }
  }

  forward = (n) => {
    this.caseIndex += n;
    if (this.caseIndex >= this.game.caseNumber) {
      this.caseIndex -= this.game.caseNumber;
      this.addMoney(this.game.startValue);
    }
    this.case = this.game.plateau.getCaseAt(this.caseIndex);
    if (this.case.isBuyable()) {
      if (this.case.isBuyed()) {

      } else {
        buyElement.disabled = false;
      }
    }
    this.reload();
  }
}

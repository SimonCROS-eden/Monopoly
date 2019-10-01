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
    document.getElementById("player" + (parseInt(this.name) + 1)).appendChild(property.getElement(true));
  }

  reload() {
    this.moneyElement.innerText = this.name + " : " + this.money + "€";
    this.element.style.left = this.case.element.offsetLeft + "px";
    this.element.style.top = this.case.element.offsetTop + "px";
  }

  buy() {
    if (this.case.isBuyable()) {
      this.case.buy(this);
      this.reload();
    }
  }

  forward = (n) => {
    this.caseIndex += n;
    this.caseIndex = this.game.plateau.verifyCase(this.caseIndex);
    this.case = this.game.plateau.getCaseAt(this.caseIndex);
    if (this.case.isBuyed()) {

    } else if (this.case.isBuyable()) {
      buyElement.disabled = false;
    }
    this.reload();
  }
}

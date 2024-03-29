class Player {

  properties = {};
  jailTurn = 0;

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

  house() {
    if (this.hasAllOfGroupOf(this.case)) {
      let minus = null;
      for (let prop of this.properties[this.case.getGroupNumber()]) {
        if (minus == null) minus = prop;
        else if (minus.getHouses() > prop.getHouses()) minus = prop;
      }
      minus.addHouse();
    }
  }

  hasAllOfGroupOf(property) {
    if (this.properties[property.getGroupNumber()] && this.properties[property.getGroupNumber()].length == property.getGroup().size) {
      return true;
    }
    return false;
  }

  removeMoney(amount) {
    this.money -= amount;
    if (this.money < 0) {
      this.money = 0;
      this.game.lose();
    }
    this.reload();
  }

  addMoney(amount) {
    this.money += amount;
    this.reload();
  }

  getName() {
    return this.name;
  }

  addProperty(property) {
    if (!this.properties[property.group]) {
      this.properties[property.group] = [];
    }
    this.properties[property.group].push(property);
    this.reloadPane();
  }

  removeProperty(property) {
    if (!this.properties[property.group] || property.getOwner() != this) {
      return;
    }
    this.properties[property.group].splice(this.properties[property.group].indexOf(property), 1);
    gameLog((e) => {
      let name = document.createElement("span");
      name.innerText = this.name + " revendu ";
      e.appendChild(name);
      let prop = document.createElement("span");
      if (this.case.hasColor()) {
        prop.style.color = property.getColor();
      }
      prop.innerText = property.name + " ";
      e.appendChild(prop);
      let bank = document.createElement("span");
      bank.innerText = "à la banque.";
      e.appendChild(bank);
    });
    this.reloadPane();
    this.reload();
  }

  reloadPane() {
    playerPaneName.innerText = this.name;
    playerPaneProperties.innerHTML = "";
    for (let key of Object.keys(this.properties).sort()) {
      for (let p of this.properties[key]) {
        playerPaneProperties.appendChild(p.getElement(true));
      }
    }

    if (this.case.type == "house") {
      if (this.hasAllOfGroupOf(this.case)) {
        houseButton.disabled = false;
      }
    }
  }

  reload() {
    this.moneyElement.innerText = this.name + " : " + this.money + "€";
    this.element.style.left = (this.case.element.offsetLeft + this.case.element.clientWidth / 2 - this.element.clientWidth / 2) + "px";
    this.element.style.top = (this.case.element.offsetTop + this.case.element.clientHeight / 2 - this.element.clientHeight / 2) + "px";
    if (this.jailTurn) {
      this.element.classList.add("jail");
      this.element.innerText = this.jailTurn;
    } else {
      this.element.classList.remove("jail");
      this.element.innerText = "";
    }
  }

  buy() {
    if (this.case.isBuyable()) {
      this.case.buy(this);
      gameLog((e) => {
        let name = document.createElement("span");
        name.innerText = this.name + " a acheté ";
        e.appendChild(name);
        let prop = document.createElement("span");
        if (this.case.hasColor()) {
          prop.style.color = this.case.getColor();
        }
        prop.innerText = this.case.name;
        e.appendChild(prop);
      });
      this.reload();
      this.reloadPane();
    }
  }

  move = (n) => {
    this.caseIndex = n;
    this.forward(0);
  }

  forward = (n) => {
    if (n > 0) {
      diceNumber.innerText = n;
    }
    if (this.jailTurn) {
      if (n == this.game.gameRules.scoreToEscape) {
        this.game.replay();
        this.jailTurn = 0;
        gameLog((e) => {
          let name = document.createElement("span");
          name.innerText = this.name + " s'est échapé de prison en faisant un " + n;
          e.appendChild(name);
        });
      } else {
        this.jailTurn--;
      }
    } else {
      this.caseIndex += n;
    }
    if (this.caseIndex >= this.game.caseNumber) {
      this.caseIndex -= this.game.caseNumber;
      this.addMoney(this.game.startValue);
      gameLog((e) => {
        let name = document.createElement("span");
        name.innerText = this.name + " est passé par la case départ (+5000€)";
        e.appendChild(name);
      });
    }
    this.case = this.game.plateau.getCaseAt(this.caseIndex);
    if (this.case.type == "luck" || this.case.type == "box") {
        gameLog((e) => {
          let name = document.createElement("span");
          name.innerText = this.name + " a pioché une carte " + (this.case.type == "luck" ? "chance" : "caisse de communauté") + ".";
          e.appendChild(name);
        });
        this.reload();
        this.game.getCard(this.case.type + "s");
    } else if (this.case.type == "gotojail") {
        this.move(this.game.plateau.jailLocation);
        this.jailTurn = 3;
        gameLog((e) => {
          let name = document.createElement("span");
          name.innerText = this.name + " est maintenant derrière les barreaux.";
          e.appendChild(name);
        });
    } else if (this.case.isBuyable()) {
      if (this.case.isBought()) {
        if (this.case.getOwner() != this) {
          this.removeMoney(this.case.getRent());
          this.case.payToOwner();

          gameLog((e) => {
            let name = document.createElement("span");
            name.innerText = this.name + " est tombé chez " + this.case.getOwner().getName() + " ";
            e.appendChild(name);

            let prop = document.createElement("span");
            if (this.case.hasColor()) {
              prop.style.color = this.case.getColor();
            }
            prop.innerText = this.case.name + " ";
            e.appendChild(prop);

            name = document.createElement("span");
            name.innerText = "(" + this.case.getRent() + "€)";
            e.appendChild(name);
          });
        }
      } else {
        buyElement.disabled = false;
      }
    }
    this.reload();
    this.reloadPane();
  }
}

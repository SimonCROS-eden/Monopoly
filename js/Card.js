class Card {
  constructor(caseName, caseType, group, price, color) {
    this.owner = null;
    this.name = caseName;
    this.type = caseType;
    this.group = group;
    this.price = price;
    this.color = color;
  }

  isBuyable() {
    return (this.type == "house" || this.type == "gare");
  }

  getPrice() {
    return this.price;
  }

  buy(player) {
    player.removeMoney(this.price);
    player.addProperty(this);
    this.setOwner(player);
  }

  isBuyed() {
    return this.owner != null;
  }

  getOwner() {
    return this.owner;
  }

  setOwner(player) {
    this.owner = player;
  }
}

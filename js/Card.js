class Card {

  owner = null;
  houses = 0;

  constructor(caseName, caseType, group, price, color) {
    this.name = caseName;
    this.type = caseType;
    this.group = group;
    this.price = price;
    this.color = color;
  }

  isBuildable() {
    return this.type == "house";
  }

  hasColor() {
    return !!this.color;
  }

  getColor() {
    return this.color;
  }

  getHouses() {
    return this.houses;
  }

  isBuyable() {
    return (this.type == "house" || this.type == "gare");
  }

  getRent(houses) {
    let h = houses || this.getHouses();
    return this.getPrice() / 10 - h;
  }

  getPrice() {
    return this.price;
  }

  payToOwner() {
    this.getOwner().addMoney(this.getRent());
  }

  buy(player) {
    player.removeMoney(this.price);
    player.addProperty(this);
    this.setOwner(player);
  }

  isBought() {
    return this.owner != null;
  }

  getOwner() {
    return this.owner;
  }

  setOwner(player) {
    this.owner = player;
  }
}

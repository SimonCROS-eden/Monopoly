class Card {

  owner = null;
  houses = 0;

  constructor(name, type, group, price, gameRules) {
    this.gameRules = gameRules;
    this.name = name;
    this.type = type;
    this.group = group;
    this.price = price;
    this.color = this.type == "house" ? this.gameRules.groups[this.group].color : null;
  }

  getGroup() {
    return this.gameRules.groups[this.group];
  }

  getGroupNumber() {
    return this.group;
  }

  isBuildable() {
    return this.type == "house";
  }

  addHouse() {
    if (this.getOwner() && this.getHouses() < 5) {
      this.houses++;
      this.getOwner().removeMoney(this.getHousePrice());
      this.getOwner().reloadPane();
    }
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
    let h = houses != null ? houses : this.getHouses();
    return Math.floor((this.getPrice() / 6 + 100 * h) / 10) * 10;
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

  getHousePrice() {
    return this.gameRules.groups[this.group].housePrice;
  }

  getOwner() {
    return this.owner;
  }

  setOwner(player) {
    this.owner = player;
  }

  getSellPrice() {
    return this.price / 2 + (this.type == "house" ? (this.getHouses() * this.getHousePrice() / 2) : 0);
  }

  remove() {
    if (this.getOwner()) {
      this.getOwner().addMoney(this.getSellPrice());
      this.getOwner().removeProperty(this);
      this.setOwner(null);
      this.houses = 0;
      this.refresh();
    }
  }

  refresh() {}
}

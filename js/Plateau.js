class Plateau {

  constructor(width, gameRules) {
    this.casesLocation = [];
    this.cases = [];
    this.gameRules = gameRules;
    plateauElement.innerHTML = "";
    plateauElement.style.gridTemplate = "repeat(" + (width) + ", 1fr) / repeat(" + (width) + ", 1fr)";
    for (var direction = 0; direction < 4; direction++) {
      for (var i = 0; i < width - 1; i++) {
        switch (direction) {
          case 0:
            this.casesLocation.push([width - 1, i]);
            break;
          case 1:
            this.casesLocation.push([width - 1 - i, width - 1]);
            break;
          case 2:
            this.casesLocation.push([0, width - 1 - i]);
            break;
          case 3:
            this.casesLocation.push([i, 0]);
            break;
          default:
            break;
        }
      }
    }
    let part = 0;
    for (var i = 0; i < this.casesLocation.length; i++) {
      let rotation = 0/* i < width - 1 ? -90 : i < width * 2 - 2 ? 0 : i < width * 3 - 3 ? 90 : 180 */;
      this.cases.push(new Case(i, this.casesLocation[i], rotation, this.gameRules.cards[i].name, this.gameRules.cards[i].type, this.gameRules.cards[i].color, this.gameRules.cards[i].group, this.gameRules.cards[i].price));
    }
  }

  getCaseAt(location) {
    return this.cases[location];
  }
}

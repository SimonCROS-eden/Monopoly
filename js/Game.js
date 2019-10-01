class Game {
  constructor(players) {
    this.players = [];
    this.plateau = new Plateau(cardsObject.size);

    for (let i = 0; i < players; i++) {
      this.players.push(new Player(i, 50000, this));
    }
  }
}

class Monopoly {

  gameRules = {};
  playersInQueue = ["Simon", "Solal"];

  constructor(gameRules) {
    this.gameRules = gameRules;
    this.plateau = new Plateau(this.gameRules.size, this.gameRules);
    launchGameButton.addEventListener("click", this.start);
    maxPlayersElements.forEach(a => a.innerText = this.gameRules.maxPlayers);
    this.refreshPlayerCount();
    joinForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      let name = joinForm.querySelector("input").value;
      if (name && name.length >= 3 && name[0] != " ") {
        this.addPlayer(name);
      }
    });
  }

  addPlayer = (player) => {
    this.playersInQueue.push(player);
    playersInQueueListElement.innerHTML = "";
    for (let p of this.playersInQueue) {
      let li = document.createElement("li");
      li.innerText = p;
      playersInQueueListElement.appendChild(li);
      this.refreshPlayerCount();
    }
  }

  refreshPlayerCount = () => {
    playersCountElements.forEach(a => a.innerText = this.playersInQueue.length);
  }

  start = () => {
    if (this.playersInQueue.length >= 2) {
      usernameSelectPane.classList.add("hidden");
      this.game = new Game(this.playersInQueue, this.gameRules);
    } else {
      alert("Minimum de 2 joueurs");
    }
  }
}

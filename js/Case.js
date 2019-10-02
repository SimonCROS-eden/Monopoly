class Case extends Card {

  constructor(caseNumber, caseLocation, rotation, caseName, caseType, caseColor, group, price) {
    super(caseName, caseType, group, price, caseColor);

    this.location = caseLocation;
    this.element = this.getElement(false);
    plateauElement.appendChild(this.element);
  }

  getElement(card) {
    let element = document.createElement("div");

    if (!card) {
      element.style.gridColumnStart = this.location[0] + 1;
      element.style.gridRowStart = this.location[1] + 1;
      element.style.transform = "rotate(" + this.rotation + "deg)";
      element.classList.add("case");
    } else {
      element.classList.add("card");
    }

    if (this.type != "chance" && this.type != "caisse") {
      if (this.type == "house") {
        element.classList.add("house");

        let color = document.createElement("div");
        color.style.backgroundColor = this.color;
        color.classList.add("color");
        element.appendChild(color);
        this.colorElement = this.color;
      } else if (this.type == "parc") {
        element.classList.add("parc");

        let car = document.createElement("i");
        car.classList.add("fas");
        car.classList.add("fa-car");
        element.appendChild(car);
      } else if (this.type == "jail") {
        element.classList.add("jail");

        let bars = document.createElement("i");
        bars.classList.add("fas");
        bars.classList.add("fa-dungeon");
        element.appendChild(bars);
      } else if (this.type == "gare") {
        element.classList.add("gare");

        let train = document.createElement("i");
        train.classList.add("fas");
        train.classList.add("fa-train");
        element.appendChild(train);
      } else if (this.type == "gotojail") {
        element.classList.add("gotojail");

        let car = document.createElement("img");
        car.src = "/images/gotojail.png"
        element.appendChild(car);
      }

      let text = document.createElement("p");
      text.innerText = this.name;
      text.classList.add("text");
      element.appendChild(text);

      if (this.isBuyable()) {
        if (!card) {
          this.priceElement = document.createElement("span");
          this.priceElement.innerText = this.price + "€";
          element.appendChild(this.priceElement);
        } else {
          let list = document.createElement("ul");
          if (this.type == "house") {
            for (let i = 0; i < 6; i++) {
              let p = document.createElement("li");
              if (i == 0) {
                p.innerText = "Terrain nu : " + (this.price / 10) + "€";
              } else if (i == 5) {
                p.innerText = "Hôtel : " + (this.price / 5) + "€";
              } else if (i == 1) {
                p.innerText = i + " maison : " + (this.price / 10 + 100) + "€";
              } else {
                p.innerText = i + " maisons : " + (this.price / 10 + 100 * i) + "€";
              }
              list.appendChild(p);
            }
          } else if (this.type == "gare") {
            for (let i = 0; i < 4; i++) {
              let p = document.createElement("li");
              if (i == 0) {
                p.innerText = (i + 1) + " gare : " + (this.price / 10) + "€";
              } else {
                p.innerText = (i + 1) + " gares : " + (this.price / 10 + 100 * i) + "€";
              }
              list.appendChild(p);
            }
          }
          element.appendChild(list);
        }
      }
    } else {
      element.innerText = this.name;
    }
    return element;
  }
}

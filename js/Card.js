class Card {
  constructor(cardNumber, cardLocation, rotation, cardName, cardType, cardColor) {
    let element = document.createElement("div");
    element.style.gridColumnStart = cardLocation[0] + 1;
    element.style.gridRowStart = cardLocation[1] + 1;
    element.style.transform = "rotate(" + rotation + "deg)";
    element.classList.add("card");
    plateauElement.appendChild(element);

    if (cardType != "chance" && cardType != "caisse") {
      if (cardType == "card") {
        element.classList.add("house");

        let color = document.createElement("div");
        color.style.backgroundColor = cardColor;
        color.classList.add("color");
        element.appendChild(color);
      } else if (cardType == "parc") {
        element.classList.add("parc");

        let car = document.createElement("i");
        car.classList.add("fas");
        car.classList.add("fa-car");
        element.appendChild(car);
      } else if (cardType == "jail") {
        element.classList.add("jail");

        let bars = document.createElement("i");
        bars.classList.add("fas");
        bars.classList.add("fa-bars");
        element.appendChild(bars);
      } else if (cardType == "gare") {
        element.classList.add("gare");

        let train = document.createElement("i");
        train.classList.add("fas");
        train.classList.add("fa-train");
        element.appendChild(train);
      } else if (cardType == "gotojail") {
        element.classList.add("gotojail");

        let car = document.createElement("img");
        car.src = "/images/gotojail.png"
        element.appendChild(car);
      }

      let text = document.createElement("div");
      text.innerText = cardName;
      text.classList.add("text");
      element.appendChild(text);
    } else {
      element.innerText = cardName;
    }

    this.element = element;
    this.name = cardName;
  }
}

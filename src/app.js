/* eslint-disable */
import "bootstrap";
import "./style.css";

document.getElementById("refreshButton").addEventListener("click", function() {
  location.reload();
});

window.onload = function() {
  const drawCards = document.querySelector(".draw-button");
  // Sonido:
  const cardSound = document.getElementById("cardSound");

  drawCards.addEventListener("click", generateCards);

  function generateRandomCard() {
    const symbols = ["♠", "♣", "♦", "♥"];
    const values = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    const color = symbol === "♠" || symbol === "♣" ? "black" : "red";

    return { symbol, value, color };
  }

  let cards = [];
  var sortedCards = [];
  const sortedCardsContainer = document.getElementById("sortedCards");

  function generateCards() {
    cardSound.play();
    // Limpiar el contenedor de cartas ordenadas
    const numberOfCards = document.getElementById("numberOfCardsInput").value;
    const cardsContainer = document.getElementById("cardsContainer");

    // Limpiar el contenedor de cartas antes de agregar nuevas cartas
    cardsContainer.innerHTML = "";
    sortedCardsContainer.innerHTML = "";
    sortedCards = [];
    cards = [];

    // Generar cartas aleatorias
    for (let i = 0; i < numberOfCards; i++) {
      const card = generateRandomCard();
      cards.push(card);

      // Crear elemento de carta
      const cardElement = document.createElement("div");
      cardElement.classList.add("div-size", "position-relative");

      for (let j = 0; j < 3; j++) {
        const cardDetails = document.createElement("div");
        if (j == 0) {
          cardDetails.classList.add("position-absolute", "upper", card.color);
          cardDetails.style.top = "4px"; // Ajustar la posición superior según sea necesario
          cardDetails.style.left = "5px"; // Ajustar la posición izquierda según sea necesario
          cardDetails.style.color = card.color;
          cardDetails.textContent = `${card.symbol}`;
        } else if (j == 1) {
          cardDetails.classList.add("position-absolute", "center", card.color);
          cardDetails.style.top = "50%"; // Centrar verticalmente
          cardDetails.style.left = "50%"; // Centrar horizontalmente
          cardDetails.style.transform = "translate(-50%, -50%)"; // Centrar el elemento
          cardDetails.style.color = card.color;
          if (card.value == "1") {
            cardDetails.textContent = `A`;
          } else if (card.value == "10") {
            cardDetails.textContent = `J`;
          } else if (card.value == "11") {
            cardDetails.textContent = `Q`;
          } else if (card.value == "12") {
            cardDetails.textContent = `K`;
          } else {
            cardDetails.textContent = `${card.value}`;
          }
        } else {
          cardDetails.classList.add("position-absolute", "lower", card.color);
          cardDetails.style.bottom = "4px"; // Ajustar la posición inferior según sea necesario
          cardDetails.style.right = "5px"; // Ajustar la posición derecha según sea necesario
          cardDetails.style.color = card.color;
          cardDetails.textContent = `${card.symbol}`;
        }
        cardElement.appendChild(cardDetails);
      }
      cardsContainer.appendChild(cardElement);
    }
  }

  let sortButton = document.getElementById("sort-button");
  sortButton.addEventListener("click", sortCards);

  function sortCards() {
    cardSound.play();
    sortedCards = [];
    sortedCardsContainer.innerHTML = "";
    let bubbleLog = document.getElementById("bubble-log");
    bubbleLog.innerHTML = "Bubble Log";

    // Ordenar las cartas con el método de burbuja
    sortedCards = cards.slice();
    let counter = 0;
    for (let i = 0; i < sortedCards.length - 1; i++) {
      for (let j = 0; j < sortedCards.length - 1 - i; j++) {
        if (parseInt(sortedCards[j].value) > sortedCards[j + 1].value) {
          // Intercambiar las cartas
          const temp = sortedCards[j];
          sortedCards[j] = sortedCards[j + 1];
          sortedCards[j + 1] = temp;
        }
      }

      // Crear una nueva fila para las cartas ordenadas
      let sortedCardsRow = document.createElement("div");
      sortedCardsRow.className = "sorted-row";
      let firstCol = document.createElement("div");
      firstCol.textContent = counter;
      firstCol.className = "firstCol";
      sortedCardsRow.appendChild(firstCol);
      // Agregar las cartas ordenadas a la fila
      sortedCards.forEach(card => {
        const sortedCardElement = document.createElement("div");
        sortedCardElement.classList.add(
          "div-size",
          "position-relative",
          card.color
        );
        for (let k = 0; k < 3; k++) {
          const sortedCardDetails = document.createElement("div");
          if (k === 0) {
            sortedCardDetails.classList.add("position-absolute", "upper");
            sortedCardDetails.style.top = "4px"; // Ajustar la posición superior según sea necesario
            sortedCardDetails.style.left = "5px"; // Ajustar la posición izquierda según sea necesario
            sortedCardDetails.textContent = `${card.symbol}`;
          } else if (k === 1) {
            sortedCardDetails.classList.add("position-absolute", "center");
            sortedCardDetails.style.top = "50%"; // Ajustar la posición superior según sea necesario
            sortedCardDetails.style.left = "50%"; // Ajustar la posición izquierda según sea necesario
            sortedCardDetails.style.transform = "translate(-50%, -50%)"; // Centrar el elemento
            if (card.value == "1") {
              sortedCardDetails.textContent = `A`;
            } else if (card.value == "10") {
              sortedCardDetails.textContent = `J`;
            } else if (card.value == "11") {
              sortedCardDetails.textContent = `Q`;
            } else if (card.value == "12") {
              sortedCardDetails.textContent = `K`;
            } else {
              sortedCardDetails.textContent = `${card.value}`;
            }
          } else {
            sortedCardDetails.classList.add("position-absolute", "lower");
            sortedCardDetails.style.bottom = "4px"; // Ajustar la posición inferior según sea necesario
            sortedCardDetails.style.right = "5px"; // Ajustar la posición derecha según sea necesario
            sortedCardDetails.textContent = `${card.symbol}`;
          }
          sortedCardElement.appendChild(sortedCardDetails);
        }
        sortedCardsRow.appendChild(sortedCardElement);
      });

      // Agregar la fila al contenedor de cartas ordenadas
      sortedCardsContainer.appendChild(sortedCardsRow);

      counter++;
    }
  }
};

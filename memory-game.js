const cardsInfo = [];
const doubleCards = [];
const finalCards = [];
const temproryCards = [];
const backsidecard = [];
let totalCounter = 0;
let matchedCards = 0;
let totalTime = 0;
let holderTime;

const urlPic =
  "https://raw.githubusercontent.com/hossein1065/hossein1065.github.io/refs/heads/javascript-javascript3-week1/hossein/cards.json";
const backSidePic =
  "https://raw.githubusercontent.com/hossein1065/hossein1065.github.io/refs/heads/javascript-javascript3-week1/hossein/backside.json";

async function getBacksideImage() {
  const response = await fetch(backSidePic);
  const pic = await response.json();
  backsidecard.push(pic);
}

async function getCardsPic(url) {
  await getBacksideImage();
  const response = await fetch(url);
  const cardPic = await response.json();
  cardPic.forEach((card) => {
    cardsInfo.push(card);
  });
  cardsInfo.forEach((card) => {
    doubleCards.push(card, card);
  });

  creatRandom(doubleCards);

  showCards();
}

function creatRandom(cardArray) {
  while (cardArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * cardArray.length);
    finalCards.push(cardArray[randomIndex]);
    cardArray.splice(randomIndex, 1);
  }
}

function showCards() {
  let cardHtml = ``;
  finalCards.forEach((card) => {
    cardHtml += `
   <div class="card" >
      <div class="card-front-back" data-id="${card.id}" data-tag="true">
        <img src="${backsidecard[0].image}" class="back-side back-side-js ">
        <img src="${card.image}" class="front-side front-side-js">
      </div>
     
    </div>
  `;
  });

  document.querySelector(".game-cards").innerHTML = cardHtml;

  const cards = document.querySelectorAll(`.card`);
  cards.forEach((card) => {
    const cardInner = card.querySelector(".card-front-back");
    cardInner.addEventListener(`click`, flip);
  });
}

function flip(eventFlip) {
  startTime();
  totalCounter++;
  document.querySelector("#total-click-js").innerHTML = totalCounter;

  const cardInner = eventFlip.currentTarget;

  if (cardInner.dataset.tag === "true" && temproryCards.length < 2) {
    cardInner.classList.add("rotate");

    const cardId = Number(cardInner.dataset.id);
    const cardInfo = cardsInfo.find((card) => card.id === cardId);
    if (cardInfo) {
      cardInfo.counter++;
    }
    const counterElement =
      cardInner.parentElement.querySelector(".card-counter");
    if (counterElement) {
      counterElement.textContent = cardInfo.counter;
    }
    temproryCards.push({
      id: cardInner.dataset.id,
      element: cardInner,
    });

    if (temproryCards.length === 2) {
      setTimeout(checkCards, 1000);
    }
    
  }
}

function checkCards() {
  const [card1, card2] = temproryCards;
  if (card1.id === card2.id) {
    matchedCards++;
    card1.element.dataset.tag = "false";
    card2.element.dataset.tag = "false";

    if (matchedCards === cardsInfo.length ) {
      stopTimer();
    }
  } else {
    card1.element.classList.remove("rotate");
    card2.element.classList.remove("rotate");
  }
  temproryCards.length = 0;
}

function startTime() {
  if (holderTime) return;

  holderTime = setInterval(function () {
    totalTime++;
    let minutes = Math.floor(totalTime / 6000);
    let seconds = Math.floor((totalTime % 6000) / 100);
    let milliSecond = totalTime % 100;
    const displayTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}:${String(milliSecond).padStart(2, "0")}`;

    document.getElementById("timer-box-js").textContent = displayTime;
  }, 10);
}

function stopTimer() {
  clearInterval(holderTime);
  holderTime = null;
  console.log(" the game end");
}
getCardsPic(urlPic);




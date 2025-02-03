const cardsInfo = [];        //  Stores information about the cards
const finalCards = [];       //   Holds the shuffled cards.
const temproryCards = [];    //Temporarily stores the two cards selected by the user
let backsidecard;
let totalCounter = 0;     //This is for the number of user attempts.
let numberMatchedCards = 0;   
let totalTime = 0;
let holderTime;

const urlPic =
  "https://raw.githubusercontent.com/hossein1065/hossein1065.github.io/refs/heads/javascript-javascript3-week1/hossein/cards.json";
const backSidePic =
  "https://raw.githubusercontent.com/hossein1065/hossein1065.github.io/refs/heads/javascript-javascript3-week1/hossein/backside.json";

async function getCardsPic() {
  const backresponse = await fetch(backSidePic);
  backsidecard = (await backresponse.json()).image;

  const response = await fetch(urlPic);
  const cardPic = await response.json();
  
  cardPic.forEach((card) => {
    cardsInfo.push(card, card);
  });

  creatRandom(cardsInfo);
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
        <img src="${backsidecard}" class="back-side back-side-js ">
        <img src="${card.image}" class="front-side front-side-js">
      </div>
    </div>
  `;
  });

  // const cardHtml = finalCards.map((card) => {
  //   return cardHtml += `
  //  <div class="card" >
  //     <div class="card-front-back" data-id="${card.id}" data-tag="true">
  //       <img src="${backsidecard}" class="back-side back-side-js ">
  //       <img src="${card.image}" class="front-side front-side-js">
  //     </div>
  //   </div>
  // `;
  // })

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
    // when the user clicks on the cards, I need the element .card-front-back where the event is actually registered . You want to perform operations like rotating the card on this specific element, not on inner elements like the image or backside of the card
  const cardInner = eventFlip.currentTarget;    //   is useful when you want to perform operations on the element where the event listener is registered, not just the element the user directly interacted with.

  if (cardInner.dataset.tag === "true" && temproryCards.length < 2) {
    cardInner.classList.add("rotate");

    const cardId = Number(cardInner.dataset.id);

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
    numberMatchedCards++;
    card1.element.dataset.tag = "false";
    card2.element.dataset.tag = "false";

    if (numberMatchedCards === finalCards.length / 2) {
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
  if (holderTime !== null) {
    clearInterval(holderTime);
    holderTime = null;
  }
}
getCardsPic(urlPic);
const doubleCards=[...cardsPic,...cardsPic];
const finalCards=[];
const temproryCards=[];

creatRandom(doubleCards);


let cardHtml=``;
finalCards.forEach((card)=>{
  cardHtml+=`
   <div class="card" >
      <div class="card-front-back" data-id="${card.id}" data-tag="true">
        <img src="/jscript2&3-project-pic/back-side.jpg" class="back-side back-side-js ">
        <img src="${card.image}" alt="" class="front-side front-side-js">
      </div>
    </div>
  `;
});
const gameCards=document.querySelector(".game-cards");
gameCards.innerHTML=cardHtml;

const cards=document.querySelectorAll(`.card`)
cards.forEach((card)=>{
  const cardInner=card.querySelector(".card-front-back")
  cardInner.addEventListener(`click`,flip);
});

 function flip(eventFlip){
  const cardInner=eventFlip.currentTarget;

  if(cardInner.dataset.tag==="true" && temproryCards.length<2){
    cardInner.classList.add("rotate")
      temproryCards.push({
        id:cardInner.dataset.id,
        element:cardInner
      });
  if(temproryCards.length===2){
    setTimeout(checkCards,1000);
  }
 }
}
    
  function checkCards(){
    const[card1, card2]=temproryCards;
    if(card1.id===card2.id){
      card1.element.dataset.tag="false"
      card2.element.dataset.tag="false"
    } 
    else{
      card1.element.classList.remove("rotate");
      card2.element.classList.remove("rotate");
    }
    temproryCards.length = 0;
  }

 
 function creatRandom(cardArray){
  while(cardArray.length>0){
    const randomIndex=Math.floor(Math.random()* cardArray.length);
    finalCards.push(cardArray[randomIndex]);
    cardArray.splice(randomIndex,1);
  }
 }


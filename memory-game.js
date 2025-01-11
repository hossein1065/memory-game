const doubleCards=[...cardsPic,...cardsPic];
const finalCards=[];
const temproryCards=[];
let checkTime= true;


creatRandom(doubleCards);

let cardHtml=``;
finalCards.forEach((card)=>{
  cardHtml+=`
   <div class="card" >
      <div class="card-front-back" data-id="${card.id}" data-tag="true">
        <img src="./jscript2&3-project-pic/back-side.jpg" class="back-side back-side-js ">
        <img src="${card.image}" class="front-side front-side-js">
      </div>
      <div class="card-counter">${card.counter}</div>
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
    startTime();
    checkTime=false;
    
  
  const cardInner=eventFlip.currentTarget;

  if(cardInner.dataset.tag==="true" && temproryCards.length<2){
    cardInner.classList.add("rotate");
    const cardId= Number(cardInner.dataset.id);
    const cardInfo= cardsPic.find(card=> card.id===cardId)
    if (cardInfo){
      cardInfo.counter++;
    }
    const counterElement= cardInner.parentElement.querySelector(".card-counter")
    if(counterElement){
      counterElement.textContent=cardInfo.counter;
    }
      temproryCards.push({
        id:cardInner.dataset.id,
        element:cardInner
      });

  if(temproryCards.length===2){
   
      setTimeout(checkCards,1000);
  }
   if(doubleCards.length===0){
    stopTimer();
   }
 }
 
}
    
  function checkCards(){
    const[card1, card2]=temproryCards;
    if(card1.id===card2.id ){
      card1.element.dataset.tag="false"
      card2.element.dataset.tag="false"
      doubleCards.splice(doubleCards.indexOf(card1),1)
      doubleCards.splice(doubleCards.indexOf(card2),1)
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


 let totalTime=0;
 let holderTime;

   function startTime(){
   
   holderTime=setInterval(function(){
   totalTime++;
   let minutes= Math.floor(totalTime / 6000);
   let seconds= Math.floor((totalTime % 6000) /100)
   let milliSecond = (totalTime%100)
   const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliSecond).padStart(2, '0')}`;

  document.getElementById('timer-box-js').textContent = displayTime;},1)
}



function stopTimer(){
  clearInterval(holderTime);
  holderTime=0;

}







 
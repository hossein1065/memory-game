const doubleCards=[...cardsPic,...cardsPic];
const finalCards=[];
const temproryCards=[];

creatRandom(doubleCards);


let cardHtml=``;
finalCards.forEach((card)=>{
  cardHtml+=`
   <div class="card" >
      <div class="card-front-back" data-id="${card.id}">
        <img src="/jscript2&3-project-pic/back-side.jpg" class="back-side back-side-js ">
        <img src="${card.image}" alt="" class="front-side front-side-js">
      </div>
    </div>
  `
})
const gameCards=document.querySelector(".game-cards");
gameCards.innerHTML=cardHtml;
const cards=document.querySelectorAll(`.card`)
cards.forEach((card)=>{
  const cardInner=card.querySelector(".card-front-back")
  cardInner.addEventListener(`click`,flip);
  
});

 

 function flip(eventFlip){
  const cardInner=eventFlip.currentTarget;
  cardInner.classList.toggle('rotate');
 }

 
 function creatRandom(){
  while(doubleCards.length>0){
    const randomIndex=Math.floor(Math.random()* doubleCards.length);
    finalCards.push(doubleCards[randomIndex]);
    doubleCards.splice(randomIndex,1);
  }
 }
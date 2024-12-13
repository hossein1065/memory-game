
const cards=document.querySelectorAll(`.card`)
for(let i=0; i<cards.length;i++){

  const cardInner=cards[i].querySelector('.card-front-back')
  cardInner.addEventListener(`click`,flip)
}
 function flip(eventFlip){
  const cardInner=eventFlip.currentTarget;
  cardInner.classList.toggle('rotate');
 }
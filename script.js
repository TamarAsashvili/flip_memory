const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const  currentEl= document.getElementById('current');
const  showBtn= document.getElementById('show');
const  hideBtn= document.getElementById('hide');
const  questionEl= document.getElementById('question');
const answerEl = document.getElementById('answer');
const  imageEl= document.getElementById('image');
const addCardBtn = document.getElementById('add-card');
const  clearBtn= document.getElementById('clear');
const  addContainer= document.getElementById('add-container');


//create variable track of currant cart

let currantActiveCard = 0;


//store DOM cards
const cardsEl = [];

//store cards data
const cardsData = getCardsData();

/*
const cardsData = [
    {
        question: 'what must a variable begin with?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'what is a variable?',
        answer: 'Container for a proce of data'
    },
    {
        question: 'Example of case Sensitive Variable',
        answer: 'thisIsAVariable'
    }
];
*/

//create all cards

function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

//create a single card in DOM

function createCard(data, index) {   
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
     <div class="inner-card">
          <div class="inner-card-front">
            <p>
            ${data.question}
            </p>
                   
          </div>
          <div class="inner-card-back">
            <p>
            ${data.answer}
            </p>
             <img src="${data.image}" alt="">
          </div>
        </div>
    `;



    card.addEventListener('click', ()=> card.classList.toggle('show-answer'))

    //add to dom cards

    cardsEl.push(card);
    cardsContainer.appendChild(card);

    updateCurrentText();
};

 //show number of cards
  function  updateCurrentText(){
        currentEl.innerHTML = `${currantActiveCard + 1}/${cardsEl.length}`;
    }

//Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;

}

//Add card to localstorage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));

    window.location.reload();
}

createCards();

//Event listeners



//next button
nextBtn.addEventListener('click', () => {
    cardsEl[currantActiveCard].className = 'card left';
    currantActiveCard = currantActiveCard + 1;

    if (currantActiveCard > cardsEl.length - 1) {
        currantActiveCard = cardsEl.length - 1;                     
    }

    cardsEl[currantActiveCard].className = 'card active';

    updateCurrentText();

});


//prev button
prevBtn.addEventListener('click', () => {
    cardsEl[currantActiveCard].className = 'card right';
    currantActiveCard = currantActiveCard -1;

    if (currantActiveCard < 0) {
        currantActiveCard = 0;                     
    }

    cardsEl[currantActiveCard].className = 'card active';

    updateCurrentText();

});


//show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
  const image = imageEl.value;
    
    if (question.trim() && answer.trim() || image.trim() ) {
        const newCard = { question, answer, image };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';
         imageEl.value = '';
       
        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
})



//clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});



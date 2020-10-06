const cardsEndPoint = "http://127.0.0.1:3000/api/cards"
const decksEndPoint = "http://127.0.0.1:3000/api/decks"

document.addEventListener('DOMContentLoaded', () => {
   const createCardForm = document.querySelector("#create-card-form");
   createCardForm.addEventListener("submit", (e) => createCardFormHandler(e));
   const createDeckForm = document.querySelector("#create-deck-form");
   createDeckForm.addEventListener("submit", (e) => createDeckFormHandler(e));
   getCards();
   getDecks();
})

function getCards(){
    fetch(cardsEndPoint)
    .then(resp => resp.json())
    .then(cards => {
        cards.data.forEach(card => {
            const thisCard = document.querySelector('#card-container')
            const newCard = new Card(card, card.attributes)
            thisCard.innerHTML += newCard.renderCard();
        })
        addCardButtons();
    })
}

function getDecks(){
    fetch(decksEndPoint)
    .then(resp => resp.json())
    .then(decks => {
        decks.data.forEach(deck => {
            const deckList = document.querySelector('#deck-list')
            const newDeck = new Deck(deck, deck.attributes)
            deckList.innerHTML = "";
            deckList.innerHTML += newDeck.renderDeck();
        })
    })
}

function addCardButtons() {
    const allCards = document.querySelectorAll('.single-card')
    allCards.forEach(thisCard => {
    const flipButton = thisCard.getElementsByClassName("flip-button")[0]
    const thisQuestion = thisCard.querySelector('.card-q')
    const thisAnswer = thisCard.querySelector('.card-a')
    const editButton = thisCard.getElementsByClassName("edit-button")[0]
    const deleteButton = thisCard.getElementsByClassName("remove-button")[0]
        flipButton.addEventListener("click", function(){
            if (thisAnswer.hidden === true){
                thisAnswer.hidden = false;
                thisQuestion.hidden = true;
            }
            else if (thisQuestion.hidden === true){
                thisQuestion.hidden = false
                thisAnswer.hidden = true
            }
        })
        editButton.addEventListener("click", e => {
            //const id = parseInt(e.target.id);
            //const card = Card.findById(id);
            //thisCard.innerHTML += card.renderCardEditForm();
        })
        //deleteButton.addEventListener("click", function(e){
            //????
        //})
    })
}

function createCardFormHandler(e){
    e.preventDefault()
    const questionInput = document.querySelector('#input-question').value
    const answerInput = document.querySelector('#input-answer').value
    const deckId = parseInt(document.querySelector('#deck-list').value)
    postCard(questionInput, answerInput, deckId)
}

function createDeckFormHandler(e){
    e.preventDefault()
    const deckInput = document.querySelector('#input-deck').value
    postDeck(deckInput)
}

function postDeck(name){
    fetch(decksEndPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name})
    })
    .then(resp => resp.json())
    .then(deck => {
        const newDeck = new Deck(deck.data, deck.data.attributes)
        document.querySelector('#deck-list').innerHTML += newDeck.renderDeck();
    })
}

function postCard(question, answer, deck_id){
    const bodyData = {question, answer, deck_id}
    fetch(cardsEndPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(card => {
        const newCard = new Card(card.data, card.data.attributes)
        document.querySelector('#card-container').innerHTML += newCard.renderCard()
        addCardButtons();
    })
}
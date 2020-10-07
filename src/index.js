const cardsEndPoint = "http://127.0.0.1:3000/api/cards"
const decksEndPoint = "http://127.0.0.1:3000/api/decks"

document.addEventListener('DOMContentLoaded', () => {
   const createCardForm = document.querySelector("#create-card-form");
   createCardForm.addEventListener("submit", (e) => createCardFormHandler(e));
   const createDeckForm = document.querySelector("#create-deck-form");
   createDeckForm.addEventListener("submit", (e) => createDeckFormHandler(e));
   getDecks();
   getCards();
})

function getCards(){
    fetch(cardsEndPoint)
    .then(resp => resp.json())
    .then(cards => {
        cards.data.forEach(card => {
            let newCard = new Card(card, card.attributes)
            newCard.renderCard();
        })
    })
}

function addDeckButtons(){
    const deckButtons = document.querySelectorAll('#new-deck-button')
    deckButtons.forEach(thisDeckButton => {
        thisDeckButton.addEventListener("click", function(){
            const cards = getCards()
            cards.filter(card => card.deck === thisDeckButton.innerText)
            debugger
            console.log("I've been clicked")
        })
    })

}

function getDecks(){
    fetch(decksEndPoint)
    .then(resp => resp.json())
    .then(decks => {
        decks.data.forEach(deck => {
            const deckList = document.querySelector('#deck-list')
            const newDeck = new Deck(deck, deck.attributes)
            deckList.innerHTML += newDeck.renderDeck();
            newDeck.renderDeckButton();
            
        })
        addDeckButtons()
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
        newDeck.renderDeckButton();
        addDeckButtons();
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
        let newCard = new Card(card.data, card.data.attributes)
        newCard.renderCard()
    })
}


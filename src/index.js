const cardsEndPoint = "http://127.0.0.1:3000/api/cards"
const decksEndPoint = "http://127.0.0.1:3000/api/decks"

document.addEventListener('DOMContentLoaded', () => {
   const createCardForm = document.querySelector("#create-card-form");
   createCardForm.addEventListener("submit", (e) => createCardFormHandler(e));
   const createDeckForm = document.querySelector("#create-deck-form");
   createDeckForm.addEventListener("submit", (e) => createDeckFormHandler(e));
   getDecks();
})

function renderCards(e){
    const cards = document.querySelector('#card-container')
    cards.innerHTML = `${e.target.innerText}`
    fetch(`http://127.0.0.1:3000/api/decks/${e.target.id}`)
    .then(resp => resp.json())
    .then(deck => {
        deck.data.attributes.cards.forEach(card => {
            let newCard = new Card(card)
            newCard.renderCard();
        })
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
        let newCard = new Card(card.data)
        newCard.renderCard()
    })
}

function getDecks(){
    fetch(decksEndPoint)
    .then(resp => resp.json())
    .then(decks => {
        decks.data.forEach(deck => {
            const newDeck = new Deck(deck)
            newDeck.renderDeck();
        })
    })
}

function postDeck(name){
    fetch(decksEndPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name})
    })
    .then(resp => resp.json())
    .then(deck => {
        const newDeck = new Deck(deck.data)
        newDeck.renderDeck();
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






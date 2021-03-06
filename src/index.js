const cardsEndPoint = "https://pvh-flipnotes.herokuapp.com/api/cards"
const decksEndPoint = "https://pvh-flipnotes.herokuapp.com/api/decks"

document.addEventListener('DOMContentLoaded', () => {
   const createCardForm = document.querySelector("#create-card-form");
   createCardForm.addEventListener("submit", (e) => createCardFormHandler(e));
   const createDeckForm = document.querySelector("#create-deck-form");
   createDeckForm.addEventListener("submit", (e) => createDeckFormHandler(e));
   getDecks();
})

function renderCards(e){
    const cards = document.querySelector('#card-container')
    cards.innerHTML = `CURRENT DECK: ${e.target.innerText} <br/><br/>`
    let removeDeck = document.createElement("button")
    removeDeck.innerHTML = `Delete This Deck`
    removeDeck.setAttribute("id", e.target.id)
    removeDeck.addEventListener("click", (e) => deleteDeck(e))
    cards.appendChild(removeDeck)
    fetch(`https://pvh-flipnotes.herokuapp.com/api/decks/${e.target.id}`)
    .then(resp => resp.json())
    .then(deck => {
        deck.data.attributes.cards.forEach(card => {
            let newCard = new Card(card)
            newCard.renderCard();
        })
    })
    .catch(error => {alert(error.message)})
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
        location.reload()
    })
    .catch(error => {alert(error.message)})
}

function deleteCard(e){
    fetch(`https://pvh-flipnotes.herokuapp.com/api/cards/${e.target.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(function(resp){
        if (resp.status == 204)
            location.reload();
        else
            throw new Error(resp.message)
            console.log(resp.status)
    })
    .catch(error => {alert(error.message)})
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
    .catch(error => {alert(error.message)})
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
    .catch(error => {alert(error.message)})
}

function deleteDeck(e) {
    fetch(`https://pvh-flipnotes.herokuapp.com/api/decks/${e.target.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(function(resp){
        if (resp.status == 204)
            location.reload();
        else
            throw new Error(resp.message)
            console.log(resp.status)
    })
    .catch(error => {alert(error.message)})
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






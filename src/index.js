const cardsEndPoint = "http://127.0.0.1:3000/api/cards"

document.addEventListener('DOMContentLoaded', () => {
   getCards()
   const createCardForm = document.querySelector("#create-card-form")
   createCardForm.addEventListener("submit", (e) => createFormHandler(e))
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
        addFlipButton();
    })
}

function addFlipButton() {
    const allCards = document.querySelectorAll('.single-card')
    allCards.forEach(thisCard => {
    const flipButton = thisCard.getElementsByClassName("flip-button")[0]
    const thisQuestion = thisCard.querySelector('.card-q')
    const thisAnswer = thisCard.querySelector('.card-a')
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
    })
}

function createFormHandler(e){
    e.preventDefault()
    const questionInput = document.querySelector('#input-question').value
    const answerInput = document.querySelector('#input-answer').value
    const deckId = parseInt(document.querySelector('#deck-list').value)
    postCard(questionInput, answerInput, deckId)
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
        addFlipButton();
    })
}
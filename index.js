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
            const cardMarkup = `
            <div data-id=${card.id}>
            <h3>${card.attributes.question}</h3>
            </div>
            <br><br>
            `;

            document.querySelector('#card-container').innerHTML += cardMarkup
        })
        
    })
}

function createFormHandler(e){
    e.preventDefault()
    const questionInput = document.querySelector('#input-question').value
    const answerInput = document.querySelector('#input-answer').value
    const deckId = parseInt(document.querySelector('#decks').value)
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
        const cardData = card.data.attributes
        const cardMarkup = `
            <div data-id=${card.id}>
            <h3>${cardData.question}</h3>
            <h3>${cardData.answer}</h3>
            </div>
            <br><br>
            `;

            document.querySelector('#card-container').innerHTML += cardMarkup
    })
}
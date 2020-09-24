const cardsIndex = "http://127.0.0.1:3000/api/cards"

document.addEventListener('DOMContentLoaded', () => {
   getCards()
})

function getCards(){
    fetch(cardsIndex)
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
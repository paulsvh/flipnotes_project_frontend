const cardsIndex = "http://127.0.0.1:3000/api/cards"

document.addEventListener('DOMContentLoaded', () => {
    fetch(cardsIndex)
    .then(resp => resp.json())
    .then(cards => {
        console.log(cards);
    })
})
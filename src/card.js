class Card {

    constructor(card, cardAttributes){
        this.id = card.id
        this.question = cardAttributes.question
        this.answer = cardAttributes.answer
        this.deck = cardAttributes.deck
        Card.all.push(this)
    }

    renderCard() {
        return `
            <div data-id=${this.id}>
                <h5>QUESTION:</h5>
                <h3>${this.question}</h3>
                <h5>ANSWER:</h5>
                <h3>${this.answer}</h3>
            </div>
            <br><br>
                `;
                //const cardDiv = document.querySelector('#card-container');
    
                //document.querySelector('#card-container').innerHTML += cardMarkup
                //const newCard = document.createElement('div')
                //newCard.innerHTML += cardMarkup;
                //newCard.style.cssText = 'border:1px solid black; width: 25%;'
                //cardDiv.appendChild(newCard);
    }

}

Card.all = [];
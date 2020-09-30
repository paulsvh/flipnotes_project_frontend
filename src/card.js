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
            <div class="single-card" id=${this.id}>
            <h3 class="card-q">${this.question}</h3>
            <h3 class="card-a" hidden>${this.answer}</h3>
            <button class="flip-button" id=${this.id} type="button">FLIP</button>
            </div>
            <br><br>
                `;
    }

}

Card.all = [];

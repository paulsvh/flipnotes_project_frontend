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

    addFlipButton() {
        const thisCard = document.getElementById(this.id)
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
    }
}

Card.all = [];

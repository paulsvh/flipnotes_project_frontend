class Card {
    constructor(card){
        this.id = card.id
        this.question = card.question
        this.answer = card.answer
        this.deck = card.deck_id
        Card.all.push(this)
            
        
    }

    renderCard() {
        const cards = document.querySelector('#card-container')

        const cardMarkup = `
            <div class="single-card" id=${this.id}>
            <h3 class="card-q">${this.question}</h3>
            <h3 class="card-a" hidden>${this.answer}</h3>
            </div>
                `;

        let elm = document.createElement('div')
        elm.innerHTML = cardMarkup
        cards.appendChild(elm)
        let flip = document.createElement('button')
        flip.setAttribute("id", this.id)
        flip.innerHTML = "FLIP IT!"
        let removeCard = document.createElement('button')
        removeCard.setAttribute("id", this.id)
        removeCard.innerHTML = "Remove This Card"
        let edit = document.createElement('button')
        edit.setAttribute("id", this.id)
        edit.innerHTML = "Edit This Card"
        const thisQuestion = elm.querySelector('.card-q')
        const thisAnswer = elm.querySelector('.card-a')
        flip.addEventListener("click", function(){
            if (thisAnswer.hidden === true){
                thisAnswer.hidden = false;
                thisQuestion.hidden = true;
            }
            else if (thisQuestion.hidden === true){
                thisQuestion.hidden = false
                thisAnswer.hidden = true
            }
        })
        cards.appendChild(flip)
        cards.appendChild(edit)
        cards.appendChild(removeCard)
    }
}
Card.all = [];

class Card {

    constructor(card, cardAttributes){
        this.id = card.id
        this.question = cardAttributes.question
        this.answer = cardAttributes.answer
        this.deck = cardAttributes.deck
        Card.all.push(this)
    }

    static findById(id) {
        return Card.all.find(card => card.id === id);
      }

    renderCard() {
        return `
            <div class="single-card" id=${this.id}>
            <h5 class="cards-deck">${this.deck.name}</h5>
            <h3 class="card-q">${this.question}</h3>
            <h3 class="card-a" hidden>${this.answer}</h3>
            <button class="flip-button" id=${this.id} type="button">FLIP</button>
            <button class="edit-button" id=${this.id} type="button">EDIT</button>
            <button class="remove-button" id=${this.id} type="button">REMOVE</button>
            </div>
            <br><br>
                `;
    }

    renderCardEditForm(){
        return `
        <form data-id=${this.id}>
        <h3>Update This Card!</h3>
        <input type="text" value="${this.question}" placeholder="${this.question}>
        <input type="text" value="${this.answer}" placeholder="${this.question}>
        <button type="submit">Save This Update</button>
        </form>
        `
    }

}

    Card.all = [];


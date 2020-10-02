class Deck {

    constructor(deck, deckAttributes){
        this.id = deck.id
        this.name = deckAttributes.name
        Deck.all.push(this)
    }

    renderDeck() {
        return `<option value="${this.id}">${this.name}</option>`;
    }

}
Deck.all = [];
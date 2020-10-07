class Deck {
    static all_decks = [];
    constructor(deck, deckAttributes){
        this.id = deck.id
        this.name = deckAttributes.name
        Deck.all_decks.push(this)
    }

    renderDeck() {
        return `<option value="${this.id}">${this.name}</option>`;
    }

    renderDeckButton(){ 
            const deckDiv = document.getElementById("deck-selector")
            const newButton = document.createElement("button")
            newButton.id = "new-deck-button"
            newButton.innerText = `${this.name}`
            deckDiv.appendChild(newButton);
    }
}

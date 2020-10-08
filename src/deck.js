class Deck {
    constructor(deck){
        this.id = deck.id
        this.name = deck.attributes.name
        this.cards = deck.attributes.cards
        Deck.all.push(this)
    }

    renderDeck() {
        const deckList = document.querySelector('#deck-list')
        const deckListMarkup = `${this.name}`
        let elm = document.createElement('option')
        elm.innerHTML = deckListMarkup
        elm.setAttribute("id", this.id)
        elm.setAttribute("value", this.id)
        deckList.appendChild(elm)

        const deckSelector = document.querySelector('#deck-selector')
        let deckButton = document.createElement('button')
        deckButton.setAttribute("id", this.id)
        deckButton.innerHTML = `${this.name}`
        deckButton.addEventListener('click', (e) => renderCards(e));
        deckSelector.appendChild(deckButton);

    }
}

Deck.all = [];
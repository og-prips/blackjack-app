class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  build() {
    const ranks = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
    ];
    const suits = ["clubs", "diamonds", "hearts", "spades"];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        const card = new Card(ranks[j], suits[i]);
        this.cards.push(card);
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  dealCard() {
    if (this.cards.length === 0) {
      this.build();
      this.shuffle();
    }

    return this.cards.pop();
  }
}

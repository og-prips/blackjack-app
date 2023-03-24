class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getFaceValue() {
    if (!isNaN(this.rank)) {
      return parseInt(this.rank);
    } else if (this.rank === "ace") {
      return 11;
    } else {
      return 10;
    }
  }
}

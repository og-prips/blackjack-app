class Hand {
  constructor(cards = []) {
    this.cards = cards;
  }

  addCard(card) {
    this.cards.push(card);
  }

  getScore() {
    let score = this.cards.reduce((sum, card) => sum + card.getFaceValue(), 0);

    let aceCount = this.getAceCount();

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  getAceCount() {
    return this.cards.filter((card) => card.rank == "ace").length;
  }

  reduceAce(score, aceCount) {
    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }
  }

  isBlackjack() {
    if (
      this.cards.some((card) => card.rank == "ace") &&
      this.cards.some(
        (card) =>
          card.rank == "10" ||
          card.rank == "jack" ||
          card.rank == "queen" ||
          card.rank == "king"
      )
    ) {
      return true;
    }

    return false;
  }
}

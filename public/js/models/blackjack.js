class Blackjack {
  constructor(player, dealer) {
    this.player = player;
    this.dealer = dealer;
    this.deck = new Deck();
    this.canHit = true;
  }

  start() {
    this.canHit = true;

    this.deck.build();
    this.deck.shuffle();

    this.player.hand = new Hand([this.deck.dealCard(), this.deck.dealCard()]);
    this.dealer.hand = new Hand([this.deck.dealCard(), this.deck.dealCard()]);

    if (this.player.hand.getScore() === 21) {
      this.canHit = false;
    }
  }

  hit(hand) {
    hand.addCard(this.deck.dealCard());
  }

  stand() {
    while (this.dealer.hand.getScore() < 17) {
      this.hit(this.dealer.hand);
    }
  }

  getWinner() {
    const playerScore = this.player.hand.getScore();
    const dealerScore = this.dealer.hand.getScore();

    if (playerScore > 21 || (dealerScore > playerScore && dealerScore <= 21)) {
      return "dealer";
    } else if (playerScore > dealerScore || dealerScore > 21) {
      return "player";
    } else {
      return "tie";
    }
  }
}

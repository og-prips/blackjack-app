window.addEventListener("load", () => {
  const hitButton = document.getElementById("hit");
  const standButton = document.getElementById("stand");
  const playAgainButton = document.getElementById("play-again");
  const betAmountText = document.getElementById("bet-amount");
  const dealButton = document.getElementById("deal");
  const balanceAddButton = document.getElementById("balance-add");
  const logoutButton = document.getElementById("logout");
  const markerButtons = document.getElementById("bet-buttons").childNodes;

  const player = new Player();
  const dealer = new Player();
  const game = new Blackjack(player, dealer);

  const userID = CookieUtils.getCookieValue("userID");
  const isLoggedIn = userID !== "";
  const user = new User();
  user.userID = userID;

  let betAmount = 0;

  document.getElementById("game-container").style.display = "none";
  hitButton.style.display = "none";
  standButton.style.display = "none";

  if (isLoggedIn) {
    updateBetContainer(user, markerButtons);
  } else {
    location.replace("/index.html");
  }

  dealButton.addEventListener("click", (e) => {
    if (betAmount == 0) {
      alert("Place a bet");
    } else {
      e.target.disabled = true;
      markerButtons.forEach((button) => {
        button.disabled = true;
      });
      document
        .getElementById("balance-container")
        .childNodes.forEach((node) => {
          node.disabled = true;
        });
      startGame(game, user, betAmount);
    }
  });

  balanceAddButton.addEventListener("click", async () => {
    const addedBalance = parseInt(
      document.getElementById("balance-input").value
    );

    if (addedBalance < 1) {
      alert("Ange minst 1");
    } else {
      user.balance = addedBalance;
      location.reload();
    }
  });

  markerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const markerValue = parseInt(e.target.value);

      user.balance.then((balance) => {
        if (markerValue + betAmount > balance) {
          return;
        } else {
          betAmount += markerValue;
          betAmountText.innerText = betAmount;
        }
      });
    });
  });

  hitButton.addEventListener("click", (e) => {
    game.hit(player.hand);

    drawHand(player.hand, "player-cards");
    drawScore(player.hand, "player-score");

    if (player.hand.getScore() >= 21) {
      endGame(game.getWinner(), user, betAmount);

      drawHand(dealer.hand, "dealer-cards");
      drawScore(dealer.hand, "dealer-score");
    }
  });

  standButton.addEventListener("click", (e) => {
    game.stand();

    endGame(game.getWinner(), user, betAmount);

    drawHand(dealer.hand, "dealer-cards");
    drawScore(dealer.hand, "dealer-score");
  });

  playAgainButton.addEventListener("click", (e) => {
    location.reload();
  });

  logoutButton.addEventListener("click", (e) => {
    location.replace("/index.html");
  });
});

const updateBetContainer = async (user, markerButtons) => {
  const balanceAmountText = document.getElementById("balance-amount");

  user.balance.then((balance) => {
    balanceAmountText.innerHTML = balance;
    if (balance === 0) {
      alert("Var god sätt in pengar för att spela");
    }
  });
};

const startGame = (game, user, betAmount) => {
  document.getElementById("hit").style.display = "initial";
  document.getElementById("stand").style.display = "initial";
  document.getElementById("game-container").style.display = "block";

  const gameContainer = document.getElementById("game-container");
  document.getElementById("end-screen").style.display = "none";

  const optionButtonsContainer = document.getElementById("option-buttons");

  optionButtonsContainer.childNodes.forEach((element) => {
    element.disabled = false;
  });

  gameContainer.style.opacity = 1;

  game.start();

  drawInitialHands(game.player, game.dealer);
  drawScore(game.player.hand, "player-score");

  if (!game.canHit) {
    game.stand();
    drawHand(game.dealer.hand, "dealer-cards");
    drawScore(game.dealer.hand, "dealer-score");

    endGame(game.getWinner(), user, betAmount);
  }
};

const endGame = (winner, user, betAmount) => {
  const endText = document.getElementById("end-text");
  const balanceText = document.getElementById("balance-text-result");

  if (winner === "dealer") {
    const subtractBalance = betAmount - betAmount * 2;
    user.balance = subtractBalance;

    endText.innerHTML = "Dealern vann!";
    endText.style.color = "red";
    balanceText.innerHTML = `Du förlorade ${betAmount} kr`;
  } else if (winner === "player") {
    user.balance = betAmount;

    endText.innerHTML = "Du vann!";
    endText.style.color = "green";
    balanceText.innerHTML = `Du vann ${betAmount} kr`;
  } else {
    endText.innerHTML = "It's a tie!";
    endText.style.color = "white";
    balanceText.innerHTML = "Lika, du får pengarna tillbaks!";
  }

  drawEndScreen();
};

const drawEndScreen = () => {
  const endScreen = document.getElementById("end-screen");
  const gameContainer = document.getElementById("game-container");
  const optionButtonsContainer = document.getElementById("option-buttons");

  optionButtonsContainer.childNodes.forEach((element) => {
    element.disabled = true;
  });

  gameContainer.style.opacity = 0.6;
  endScreen.style.display = "block";
  endScreen.style.opacity = 0.9;
  endScreen.style.position = "absolute";
};

const drawInitialHands = (player, dealer) => {
  const dealerContainer = document.getElementById("dealer-cards");
  const dealerScoreText = document.getElementById("dealer-score");

  const hiddenCardImg = document.createElement("img");
  hiddenCardImg.id = "hidden-card";
  hiddenCardImg.src = "images/cards/backside.png";

  const visibleCard = dealer.hand.cards[1];

  const visibleCardImg = document.createElement("img");
  visibleCardImg.src = `images/cards/${visibleCard.rank}_of_${visibleCard.suit}.png`;

  dealerContainer.innerHTML = "";
  dealerContainer.appendChild(hiddenCardImg);
  dealerContainer.appendChild(visibleCardImg);

  const visibleCardScore = visibleCard.getFaceValue();
  dealerScoreText.innerText = visibleCardScore;

  drawHand(player.hand, "player-cards");
};

const drawHand = (hand, elementID) => {
  const container = document.getElementById(elementID);
  container.innerHTML = "";

  hand.cards.forEach((card) => {
    const cardImg = document.createElement("img");
    cardImg.src = `images/cards/${card.rank}_of_${card.suit}.png`;

    container.appendChild(cardImg);
  });
};

const drawScore = (hand, elementID) => {
  const score = hand.getScore();
  let scoreText = score;

  document.getElementById(elementID).innerText = scoreText;
};

window.addEventListener("load", () => {
  const loginButton = document.getElementById("login");
  const registerButton = document.getElementById("register");
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");

  const playBlackjackLink = document.getElementById("play-blackjack");
  playBlackjackLink.style.display = "none";

  CookieUtils.setCookie("userID", "", 0);

  loginButton.addEventListener("click", () => {
    const user = new User(nameInput.value, passwordInput.value);

    user.login(function (success) {
      if (success) {
        CookieUtils.setCookie("userID", user.userID, 0);

        alert(`Inloggad, välkommen ${user.name}!`);
        location.replace("/blackjack-play.html");
      } else {
        CookieUtils.setCookie("userID", "", 0);
        alert("Fel användarnamn eller lösenord");
      }
    });
  });

  registerButton.addEventListener("click", () => {
    const user = new User(nameInput.value, passwordInput.value);

    userExists(user, (exists) => {
      if (exists) {
        alert("Användarnamn upptaget!");
      } else if (nameInput.value === "" || passwordInput.value === "") {
        alert("Inga tomma fält, tack!");
      } else {
        user.save();
        nameInput.value = "";
        passwordInput.value = "";
        alert("Användare registrerad, du kan nu logga in");
      }
    });
  });
});

const userExists = (user, callback) => {
  $.get("/GetAllUserNames/", (response) => {
    let exists = false;
    response.forEach((retrievedUser) => {
      if (retrievedUser.Name === user.name) {
        exists = true;
      }
    });
    callback(exists);
  });
};

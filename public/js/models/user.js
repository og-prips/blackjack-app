class User {
  #balance;

  get balance() {
    return new Promise((resolve, reject) => {
      $.post("/GetUserBalance/", this, (response) => {
        this.#balance = response[0].Balance;
        console.log(this.#balance);
        resolve(this.#balance);
      });
    });
  }

  set balance(value) {
    const userObj = { balance: value, userID: this.userID };
    
    (async () => {
      await $.post("/SetUserBalance/", userObj, (response) => {});
    })();
  }

  constructor(name, password) {
    this.userID;
    this.name = name;
    this.password = password;
  }

  save() {
    $.post("/AddUser/", this, (response) => {});
  }

  login(resolve) {
    $.post("/Login/", this, (response) => {
      if (response.length > 0) {
        this.userID = response[0].UserID;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}

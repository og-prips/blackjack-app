const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

const sql = require("msnodesqlv8");

const connString =
  "server=.;Database=BLACKJACK;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.post("/Login/", (request, response) => {
  const user = request.body;

  const sqlCode = `select UserID, Name, Password from Users WHERE Name = '${user.name}' AND Password = '${user.password}'`;

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.json(result);
    }
  });
});

app.post("/AddUser/", (request, response) => {
  const user = request.body;

  const sqlCode =
    "INSERT INTO Users(Name, Password, Balance) " +
    `VALUES ('${user.name}', '${user.password}', 0)`;

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.json(result);
    }
  });
});

app.post("/GetUserBalance/", (request, response) => {
  const user = request.body;

  const sqlCode = `SELECT Balance FROM Users WHERE UserID = ${user.userID}`;

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.json(result);
    }
  });
});

app.post("/SetUserBalance/", (request, response) => {
  const user = request.body;

  const sqlCode = `UPDATE Users SET Balance = Balance + ${user.balance} WHERE UserID = ${user.userID}`;
  console.log(sqlCode);

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/GetAllUserNames", (request, response) => {
  const sqlCode = `SELECT Name FROM Users`;

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.json(result);
    }
  });
});

app.listen(8080);
console.log("listening on localhost:8080");

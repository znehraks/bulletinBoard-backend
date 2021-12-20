require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./connection");
const cors = require("cors");
app.use(cors());
// "Origin, X-Requested-With, Content-Type, Accept"
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM board ORDER BY created_at DESC";
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

app.listen(4000, () => {
  console.log(`listening on port ${process.env.PORT}`);
  console.log(process.env.PORT);
});

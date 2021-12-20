require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./connection");
const cors = require("cors");

const parser = bodyParser.json();
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

//메인페이지 게시판 모두 불러오기
app.get("/", parser, (req, res) => {
  const sql = "SELECT * FROM board WHERE is_deleted=0 ORDER BY created_at DESC";
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//게시판 글 작성하기
app.post("/create", parser, (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO board(user_code, board_author, board_title, board_content) VALUES(${req.body.user_code},'${req.body.board_author}','${req.body.board_title}','${req.body.board_content}')`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

//게시판 글 수정하기
app.put("/update/:code", parser, (req, res) => {
  console.log(req);
  const sql = `UPDATE board SET board_title = '${req.body.board_title}', board_content='${req.body.board_content}' where board_code = '${req.params.code}'`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

//게시판 글 삭제하기(삭제처럼 보이게 하기)
app.post("/delete", parser, (req, res) => {
  console.log(req.body.board_code);
  const sql = `UPDATE board SET is_deleted = 1 where board_code=${req.body.board_code}`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
  console.log(process.env.PORT);
});

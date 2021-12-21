require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./connection");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

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

//jwt 인증함수
const authenticateJWT = (authorization) => {
  const user = jwt.verify(authorization.split(" ")[1], process.env.SECRET_KEY);
  return user;
};
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
  const sql = `INSERT INTO board(user_code, board_author, board_title, board_content) VALUES(${req.body.user_code},'${req.body.board_author}','${req.body.board_title}','${req.body.board_content}')`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//게시판 글 수정하기
app.put("/update/:code", parser, (req, res) => {
  const sql = `UPDATE board SET board_title = '${req.body.board_title}', board_content='${req.body.board_content}' where board_code = '${req.params.code}'`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//게시판 글 삭제하기(삭제처럼 보이게 하기)
app.post("/delete", parser, (req, res) => {
  const sql = `UPDATE board SET is_deleted = 1 where board_code=${req.body.board_code}`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//특정 유저 정보 불러오기
app.get("/user", (req, res) => {
  try {
    const { code } = authenticateJWT(req.headers.authorization);
    const sql = `SELECT * FROM user LEFT JOIN board ON user.user_code = board.user_code WHERE user.user_code = ${code};`;
    connection.query(sql, (err, data, fields) => {
      if (err) throw err;
      res.send(data);
    });
  } catch (e) {
    res.send({ success: false });
  }
});

//회원가입하기
app.post("/user/create", parser, async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
  const sql = `INSERT INTO user(user_name, user_id, user_password) VALUES('${req.body.user_name}','${req.body.user_id}','${hashedPassword}')`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//로그인하기
app.post("/user/login", parser, async (req, res) => {
  const sql = `SELECT * FROM user WHERE user_id = '${req.body.user_id}'`;
  connection.query(sql, (err, data) => {
    if (err) throw err;
    bcrypt.compare(
      req.body.user_password,
      data[0].user_password,
      (err, compareRes) => {
        if (err) res.send({ success: false, error: "User not found" });
        if (compareRes) {
          const token = jwt.sign(
            { code: data[0].user_code, user_id: data[0].user_id },
            process.env.SECRET_KEY
          );
          res.send({ success: true, token });
        } else {
          res.send({ success: false, error: "Incorrect Password" });
        }
      }
    );
  });
});

app.get("/me", (req, res) => {
  try {
    const user = authenticateJWT(req.headers.authorization);
    res.send(user);
  } catch (e) {
    res.send({ success: false });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
  console.log(process.env.PORT);
});

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const parser = bodyParser.json();
const connection = require("../connection");
//메인페이지 게시판 모두 불러오기
router.get("/", parser, (req, res) => {
  const sql = "SELECT * FROM board WHERE is_deleted=0 ORDER BY created_at DESC";
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//게시판 글 작성하기
router.post("/create", parser, (req, res) => {
  const sql = `INSERT INTO board(user_code, board_author, board_title, board_content) VALUES(${req.body.user_code},'${req.body.board_author}','${req.body.board_title}','${req.body.board_content}')`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//게시판 글 수정하기
router.put("/update/:code", parser, (req, res) => {
  const sql = `UPDATE board SET board_title = '${req.body.board_title}', board_content='${req.body.board_content}' where board_code = '${req.params.code}'`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//게시판 글 삭제하기(삭제처럼 보이게 하기)
router.post("/delete", parser, (req, res) => {
  const sql = `UPDATE board SET is_deleted = 1 where board_code=${req.body.board_code}`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;

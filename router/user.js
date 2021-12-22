const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateJWT = require("../utils");
const parser = bodyParser.json();
const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//특정 유저 정보 불러오기
router.get("/", (req, res) => {
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
router.post("/create", parser, async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
  const sql = `INSERT INTO user(user_name, user_id, user_password) VALUES('${req.body.user_name}','${req.body.user_id}','${hashedPassword}')`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

//로그인하기
router.post("/login", parser, async (req, res) => {
  const sql = `SELECT * FROM user WHERE user_id = '${req.body.user_id}'`;
  connection.query(sql, (err, data) => {
    if (err) {
      res.send({
        success: false,
        err_code: -1,
        err_msg: "예기치 못한 오류가 발생했습니다.",
      });
    }
    if (data.length === 0) {
      res.send({
        success: false,
        err_code: 1,
        err_msg: "가입되지 않은 아이디입니다.",
      });
      return;
    }
    bcrypt.compare(
      req.body.user_password,
      data[0].user_password,
      (err, compareRes) => {
        if (err) {
          res.send({
            success: false,
            err_code: -1,
            err_msg: "예기치 못한 오류가 발생했습니다.",
          });
        }
        if (compareRes) {
          const token = jwt.sign(
            { code: data[0].user_code, user_id: data[0].user_id },
            process.env.SECRET_KEY
          );
          res.send({ success: true, token });
        } else {
          res.send({
            success: false,
            err_code: 2,
            err_msg: "비밀번호가 틀립니다.",
          });
        }
      }
    );
  });
});

router.get("/me", (req, res) => {
  try {
    const user = authenticateJWT(req.headers.authorization);
    res.send(user);
  } catch (e) {
    res.send({ success: false });
  }
});

module.exports = router;

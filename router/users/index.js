const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateJWT = require("../../utils");
const parser = bodyParser.json();
const bcrypt = require("bcrypt");
const { User } = require("../../database/models");
const customError = require("../../customError");
const Joi = require("joi");

//데이터베이스 관련 로직 오류 에러코드: -1XX
//라우터 및 미들웨어 관련 로직 오류 에러코드: -2XX
//DTO유효성 관련 오류 에러코드: -3XX

//특정 유저 정보 불러오기
router.get("/", async (req, res) => {
  try {
    const { code } = authenticateJWT(req.headers.authorization);
    if (code) {
      const users = await User.findOne({ where: { user_code: code } });
      console.log(users);

      res.status(200).send({
        success: true,
        data: users,
      });
      return;
    }
  } catch (e) {
    res.status(400).send({
      success: false,
      err_no: customError.DATABASE_ERROR.ERR_NO,
      err_msg: customError.DATABASE_ERROR.CLIENT_ERR_MSG,
    });
    return;
  }
});

//회원가입하기
router.post("/", parser, async (req, res) => {
  try {
    console.log(req.body);
    const scheme = Joi.object({
      user_name: Joi.string()
        .regex(new RegExp("^([가-힣a-zA-Z]){2,10}$"))
        .required(),
      user_id: Joi.string()
        .regex(new RegExp("^(?=.*[a-zA-z]).{6,12}$"))
        .required(),
      user_password: Joi.string()
        .regex(
          new RegExp("^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,25}$")
        )
        .required(),
    });

    const { error } = scheme.validate({ ...req.body });
    console.log(error);
    if (error === undefined) {
      const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
      if (hashedPassword) {
        const result = await User.create({
          user_name: req.body.user_name,
          user_id: req.body.user_id,
          user_password: hashedPassword,
        });

        if (result.dataValues) {
          res.status(200).send({ success: true });
          return;
        } else {
          res.status(400).send({
            success: false,
            err_no: customError.NO_CREATED_ROWS.ERR_NO,
            err_msg: customError.NO_CREATED_ROWS.CLIENT_ERR_MSG,
          });
          return;
        }
      } else {
        res.status(400).send({
          success: false,
          err_no: customError.BCRYPT_ERROR.ERR_NO,
          err_msg: customError.BCRYPT_ERROR.CLIENT_ERR_MSG,
        });
        return;
      }
    } else {
      res.status(400).send({
        success: false,
        err_no: customError.VALIDATION_ERROR.ERR_NO,
        err_msg: customError.VALIDATION_ERROR.CLIENT_ERR_MSG,
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      err_no: customError.DATABASE_ERROR.ERR_NO,
      err_msg: customError.DATABASE_ERROR.CLIENT_ERR_MSG,
    });
    return;
  }
});
module.exports = router;

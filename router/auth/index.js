const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateJWT = require("../../utils");
const parser = bodyParser.json();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../database/models");
const customError = require("../../customError");
const Joi = require("joi");

//로그인하기
router.post("/login", parser, async (req, res) => {
  try {
    const scheme = Joi.object({
      user_id: Joi.string()
        .regex(new RegExp("^(?=.*[a-zA-z]).{6,12}$"))
        .required(),
      user_password: Joi.string()
        .regex(
          new RegExp("^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,25}$")
        )
        .required(),
      //   user_id: Joi.string().required(),
      //   user_password: Joi.string().required(),
    });

    const { error } = scheme.validate({ ...req.body });
    console.log(error);
    if (error === undefined) {
      const user = await User.findOne({ where: { user_id: req.body.user_id } });

      if (user) {
        const compareRes = await bcrypt.compare(
          req.body.user_password,
          user.user_password
        );

        if (compareRes) {
          //비밀번호 맞음 로그인
          const token = jwt.sign(
            { code: user.user_code, user_id: user.user_id },
            process.env.SECRET_KEY
          );
          res.status(200).send({ success: true, token });
          return;
        } else {
          //비밀번호틀림
          res.status(400).send({
            success: false,
            err_no: customError.AUTH_ERROR_PASSWORD.ERR_NO,
            err_msg: customError.AUTH_ERROR_PASSWORD.CLIENT_ERR_MSG,
          });
          return;
        }
      } else {
        res.status(400).send({
          success: false,
          err_no: customError.AUTH_ERROR_ID.ERR_NO,
          err_msg: customError.AUTH_ERROR_ID.CLIENT_ERR_MSG,
        });
        return;
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({
      success: false,
      err_no: customError.DATABASE_ERROR.ERR_NO,
      err_msg: customError.DATABASE_ERROR.CLIENT_ERR_MSG,
    });
    return;
  }
});

router.get("/me", (req, res) => {
  try {
    const user = authenticateJWT(req.headers.authorization);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      err_no: customError.AUTH_ERROR_ME.ERR_NO,
      err_msg: customError.AUTH_ERROR_ME.CLIENT_ERR_MSG,
    });
  }
});

module.exports = router;

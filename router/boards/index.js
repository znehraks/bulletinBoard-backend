const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const parser = bodyParser.json();
const customError = require("../../customError");
const { Board } = require("../../database/models");
const Joi = require("joi");

//데이터베이스 관련 로직 오류 에러코드: -1XX
//라우터 및 미들웨어 관련 로직 오류 에러코드: -2XX
//DTO유효성 관련 오류 에러코드: -3XX

//메인페이지 게시판 모두 불러오기
router.get("/", parser, async (req, res) => {
  try {
    //모든 게시물 불러오기
    const boards = await Board.findAll({ order: [["board_code", "DESC"]] });

    //게시물이 존재하면
    if (boards) {
      res.status(200).send({ success: true, data: boards });
      return;
      //게시물이 null이면
    } else {
      res.status(200).send({ success: true, data: [], isEmpty: true });
      return;
    }
    //예외처리
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

//메인페이지 게시판 한 개만 불러오기
router.get("/:code", parser, async (req, res) => {
  try {
    //board_code == code인 게시물 한 개 불러오기
    const board = await Board.findOne({
      where: { board_code: req.params.code },
    });

    //해당하는 게시물이 있을 때
    if (board) {
      res.status(200).send({ success: true, data: board });
      return;

      //해당하는 게시물이 없을 때
    } else {
      res.status(200).send({ success: true, data: [], isEmpty: true });
      return;
    }

    //예외 처리
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

//게시판 글 작성하기
router.post("/", parser, async (req, res) => {
  try {
    //DTO 객체 생성
    const scheme = Joi.object({
      user_code: Joi.number().integer().min(1).required(),
      board_author: Joi.string().min(1).max(20).required(),
      board_title: Joi.string().min(1).max(30).required(),
      board_content: Joi.string().min(1).max(1000).required(),
    });

    //DTO 유효성 체크
    const { error } = scheme.validate({
      ...req.body,
      user_code: +req.body.user_code,
    });

    //유효성에 문제가 없다면
    if (error === undefined) {
      //새 게시물 생성
      const result = await Board.create({
        user_code: req.body.user_code,
        board_author: req.body.board_author,
        board_title: req.body.board_title,
        board_content: req.body.board_content,
      });

      //새 게시물이 생성되었다면
      if (result.dataValues) {
        res.status(200).send({ success: true });
        return;

        //새 게시물이 생성되지않았다면
      } else {
        res.status(400).send({
          success: false,
          err_no: customError.NO_CREATED_ROWS.ERR_NO,
          err_msg: customError.NO_CREATED_ROWS.CLIENT_ERR_MSG,
        });
        return;
      }
      //유효성 검증에 실패하면
    } else {
      res.status(400).send({
        success: false,
        err_no: customError.VALIDATION_ERROR.ERR_NO,
        err_msg: customError.VALIDATION_ERROR.CLIENT_ERR_MSG,
      });
      return;
    }
    //예외처리
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

//게시판 글 수정하기
router.put("/:code", parser, async (req, res) => {
  try {
    //DTO 객체 생성
    const scheme = Joi.object({
      board_code: Joi.number().required(),
      board_title: Joi.string().min(1).max(30).required(),
      board_content: Joi.string().min(1).max(1000).required(),
    });
    //DTO 유효성 체크
    const { error } = scheme.validate({
      board_code: +req.params.code,
      ...req.body,
    });

    //유효성에 문제가 없다면
    if (error === undefined) {
      //수정을 원하는 로우 찾기
      const board = await Board.findOne({
        where: { board_code: req.params.code },
      });

      //row가 존재한다면
      if (board) {
        //수정 시도
        const result = await Board.update(
          {
            board_title: req.body.board_title,
            board_content: req.body.board_content,
          },
          {
            where: { board_code: req.params.code },
          }
        );
        console.log(result);

        //이 api에서는 최대 1개만 수정하므로 affectedRows의 개수가 1이면 성공
        if (result[0] === 1) {
          res.status(200).send({ success: true });
          return;
          //result가 1이 아니면(주로 수정되지 않았다면 0)
        } else {
          res.status(400).send({
            success: false,
            err_no: customError.NO_TARGET.ERR_NO,
            err_msg: customError.NO_TARGET.CLIENT_ERR_MSG,
          });
          return;
        }
        //findOne을 통해 아무 row도 찾지 못했다면(삭제되었을 가능성이 큼)
      } else {
        res.status(400).send({
          success: false,
          err_no: customError.NO_AFFECTED_ROWS.ERR_NO,
          err_msg: customError.NO_AFFECTED_ROWS.CLIENT_ERR_MSG,
        });
        return;
      }
      //유효성 검증에 실패하면
    } else {
      res.status(400).send({
        success: false,
        err_no: customError.VALIDATION_ERROR.ERR_NO,
        err_msg: customError.VALIDATION_ERROR.CLIENT_ERR_MSG,
      });
      return;
    }
    //예외처리
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      err_no: customError.DATABASE_ERROR.ERR_NO,
      err_msg: customError.DATABASE_ERROR.CLIENT_ERR_MSG,
    });
  }
});

//게시판 글 삭제하기(삭제처럼 보이게 하기)
router.delete("/", parser, async (req, res) => {
  try {
    //유효성 검증 객체
    const scheme = Joi.object({
      board_code: Joi.number().required(),
    });

    //유효성 검증
    const { error } = scheme.validate({ board_code: +req.body.board_code });
    console.log(error);

    //유효성 검증 시 에러가 없다면
    if (error === undefined) {
      const result = await Board.destroy({
        where: { board_code: req.body.board_code },
      });
      //정상적으로 삭제되었다면(삭제처리)
      if (result === 1) {
        res.status(200).send({ success: true });
        return;

        //정상적으로 삭제되지 않았다면
      } else {
        res.status(400).send({
          success: false,
          err_no: customError.NO_AFFECTED_ROWS.ERR_NO,
          err_msg: customError.NO_AFFECTED_ROWS.CLIENT_ERR_MSG,
        });
        return;
      }

      //유효성 검증에 실패했다면
    } else {
      res.status(400).send({
        success: false,
        err_no: customError.VALIDATION_ERROR.ERR_NO,
        err_msg: customError.VALIDATION_ERROR.CLIENT_ERR_MSG,
      });
      return;
    }

    //예외처리
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

// //게시판 글 삭제하기(실제 삭제)
// router.delete("/", parser, (req, res) => {
//   try {
//     const sql = `DELETE FROM board WHERE board_code=${req.body.board_code}`;
//     connection.query(sql, (err, data, fields) => {
//       if (err) {
//         res.status(400).send({
//           success: false,
//           err_no: customError.DATABASE_ERROR.ERR_NO,
//           err_msg: customError.DATABASE_ERROR.CLIENT_ERR_MSG,
//         });
//         return;
//       } else {
//         res.status(200).send({ success: true });
//         return;
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({
//       success: false,
//       err_no: customError.ROUTER_ERROR.ERR_NO,
//       err_msg: customError.ROUTER_ERROR.CLIENT_ERR_MSG,
//     });
//   }
// });
module.exports = router;

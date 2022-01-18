const customError = {
  DATABASE_ERROR: { ERR_NO: -100, CLIENT_ERR_MSG: "오류가 발생했습니다." },
  NO_AFFECTED_ROWS: {
    ERR_NO: -101,
    CLIENT_ERR_MSG: "수정될 항목이 유효하지 않습니다.",
  },
  NO_CREATED_ROWS: {
    ERR_NO: -102,
    CLIENT_ERR_MSG: "정상적으로 생성되지 않았습니다.",
  },
  NO_TARGET: {
    ERR_NO: -103,
    CLIENT_ERR_MSG: "대상 게시물이 존재하지 않습니다.",
  },
  ROUTER_ERROR: { ERR_NO: -200, CLIENT_ERR_MSG: "오류가 발생했습니다." },
  BCRYPT_ERROR: { ERR_NO: -201, CLIENT_ERR_MSG: "오류가 발생했습니다." },
  JWT_ERROR: { ERR_NO: -202, CLIENT_ERR_MSG: "" },
  VALIDATION_ERROR: {
    ERR_NO: -300,
    CLIENT_ERR_MSG: "입력값이 유효하지 않습니다.",
  },
  AUTH_ERROR_ID: {
    ERR_NO: -400,
    CLIENT_ERR_MSG: "아이디가 존재하지 않습니다.",
  },
  AUTH_ERROR_PASSWORD: { ERR_NO: -401, CLIENT_ERR_MSG: "비밀번호가 틀립니다." },

  AUTH_ERROR_ME: { ERR_NO: -402, CLIENT_ERR_MSG: "" },
};

module.exports = customError;

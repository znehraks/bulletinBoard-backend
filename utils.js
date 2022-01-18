const jwt = require("jsonwebtoken");

//jwt 인증함수
const authenticateJWT = (authorization) => {
  try {
    const user = jwt.verify(
      authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    return user;
  } catch (e) {
    return { code: null };
  }
};

module.exports = authenticateJWT;

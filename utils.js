const jwt = require("jsonwebtoken");

//jwt 인증함수
const authenticateJWT = (authorization) => {
  const user = jwt.verify(authorization.split(" ")[1], process.env.SECRET_KEY);
  return user;
};

module.exports = authenticateJWT;

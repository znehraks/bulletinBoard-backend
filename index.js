require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./database/models");
const router = require("./router");
// const morgan = require("morgan");
// const path = require("path");
// const rfs = require("rotating-file-stream");

// const accessLogStream = rfs.createStream("access.log", {
//   interval: "1d",
//   path: path.join(__dirname, "log"),
// });
// app.use(morgan("combined", { stream: accessLogStream }));

//CORS
const corsOptions = {
  // origin: "https://bulletinboard-designc.netlify.app",
  // origin: "http://192.168.45.129:3000",
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
  console.log(process.env.PORT);
});

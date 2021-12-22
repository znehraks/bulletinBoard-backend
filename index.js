require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const postRouter = require("./router/post");
const userRouter = require("./router/user");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

app.use(cors());
// "Origin, X-Requested-With, Content-Type, Accept"
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://bulletinboard-designc.netlify.app/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const accessLogStream = rfs.createStream("access.log", {
//   interval: "1d",
//   path: path.join(__dirname, "log"),
// });
// app.use(morgan("combined", { stream: accessLogStream }));

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
  console.log(process.env.PORT);
});

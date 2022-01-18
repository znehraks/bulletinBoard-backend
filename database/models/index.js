const Sequelize = require("sequelize");
const User = require("./user");
const Board = require("./board");
const env = process.env.NODE_ENV === "dev" ? "development" : "production";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Board = Board;

User.init(sequelize);
Board.init(sequelize);

User.associate(db);
Board.associate(db);

module.exports = db;

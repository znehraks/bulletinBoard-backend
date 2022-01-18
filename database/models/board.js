const Sequelize = require("sequelize");

class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        board_code: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "게시물 고유 번호",
        },
        board_author: {
          type: Sequelize.STRING(20),
          allowNull: false,
          comment: "게시물 작성자",
        },
        board_title: {
          type: Sequelize.STRING(30),
          allowNull: false,
          comment: "게시물 제목",
        },
        board_content: {
          type: Sequelize.STRING(1000),
          allowNull: false,
          comment: "게시물 내용",
        },
        board_img_url: {
          type: Sequelize.STRING(500),
          comment: "게시물 사진 url",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Board",
        tableName: "boards",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Board.belongsTo(db.User, {
      foreignKey: "user_code",
      targetKey: "user_code",
    });
  }
}

module.exports = Board;

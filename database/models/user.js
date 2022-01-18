const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_code: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "사용자 고유 번호",
        },
        user_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          comment: "사용자 이름",
        },
        user_id: {
          type: Sequelize.STRING(20),
          allowNull: false,
          comment: "사용자 아이디",
        },
        user_password: {
          type: Sequelize.STRING(200),
          allowNull: false,
          comment: "사용자 비밀번호",
        },
        is_login: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "사용자 로그인 여부",
        },

        //이어지는 3개 컬럼은 아래 옵션에서 자체 설정이 가능하다.
        // is_deleted:{
        //     type: Sequelize.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false,
        //     comment: "로우 삭제 여부"
        // }
        // created_at: {
        //     type: Sequelize.DATE,
        //     allowNull: false,
        //     defaultValue: Sequelize.NOW,
        //     comment: "사용자 생성 일시"
        // },
        // updated_at: {
        //     type: Sequelize.DATE,
        //     allowNull: true,
        //     comment: "사용자 수정 일시"
        // },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Board, {
      foreignKey: "user_code",
      sourceKey: "user_code",
    });
  }
}

module.exports = User;

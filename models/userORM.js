const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "1234",
    database: "porto",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

const UserORM = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    },
    avatar: {
        type: DataTypes.TEXT
    }
});

module.exports = UserORM;
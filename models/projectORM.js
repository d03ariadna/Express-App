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

const ProjectORM = sequelize.define("projects", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.TEXT
    },
    client: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    }
    
});

module.exports = ProjectORM;
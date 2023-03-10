"use strict";
require('dotenv').config();

const feedback = (sequelize, DataTypes) => {
    const feedback = sequelize.define('feedback', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return feedback;
};

module.exports = feedback;
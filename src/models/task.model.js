"use strict";
require('dotenv').config();

const task = (sequelize, DataTypes) => {
    const task = sequelize.define('task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        credit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull:true
        }
    }, {
        timestamps: false
    })

    return task;
};

module.exports = task;
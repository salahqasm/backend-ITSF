"use strict";
require('dotenv').config();

const skill = (sequelize, DataTypes) => {
    const skill = sequelize.define('skill', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM('Front-End', 'Back-End', 'Mobile Application', 'UI/UX', 'Image Processing', 'Multimedia'),
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return skill;
};

module.exports = skill;
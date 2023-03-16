"use strict";
require('dotenv').config();

const skill = (sequelize, DataTypes) => {
    const skill = sequelize.define('skill', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return skill;
};

module.exports = skill;
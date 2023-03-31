"use strict";
require('dotenv').config();

const taskSkills = (sequelize, DataTypes) => {
    const taskSkills = sequelize.define('taskSkills', {

    }, {
        timestamps: false
    })

    return taskSkills;
};

module.exports = taskSkills;
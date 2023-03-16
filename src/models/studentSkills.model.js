"use strict";
require('dotenv').config();

const studentskills = (sequelize, DataTypes) => {
    const studentskills = sequelize.define('studentskills', {
        
    }, {
        timestamps: false
    })

    return studentskills;
};

module.exports = studentskills;
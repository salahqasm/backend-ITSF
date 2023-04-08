"use strict";
require('dotenv').config();

const taskReq = (sequelize, DataTypes) => {
    const taskReq = sequelize.define('taskReq', {
        
    }, {
        timestamps: false
    })

    return taskReq;
};

module.exports = taskReq;
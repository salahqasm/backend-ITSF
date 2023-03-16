"use strict";
require('dotenv').config();

const taskReq = (sequelize, DataTypes) => {
    const taskReq = sequelize.define('request', {
        studentEmail:{
            type:DataTypes.INTEGER
        },
        taskID:{
            type:DataTypes.INTEGER
        }
    }, {
        timestamps: false
    })

    return taskReq;
};

module.exports = taskReq;
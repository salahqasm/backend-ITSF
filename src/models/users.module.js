"use strict";
require('dotenv').config();

const users = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        userType:{
            type: DataTypes.ENUM('student', 'company','doctor'),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            primaryKey: true
        }

    }, {
        timestamps: false
    })

    return users;
};

module.exports = users;
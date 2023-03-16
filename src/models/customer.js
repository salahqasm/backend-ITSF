"use strict";
require('dotenv').config();
const customer = (sequelize, DataTypes) => {
    const customer = sequelize.define('customer', {
        name:{
            type: DataTypes.STRING,
            
        },
        email:{
            type: DataTypes.STRING,
            
        }
    },{
        timestamps:false
    })
    
    return customer;
};

module.exports = customer;
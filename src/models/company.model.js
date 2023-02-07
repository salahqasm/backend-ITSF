"use strict";
require('dotenv').config();
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const company = (sequelize, DataTypes) => {
    const company = sequelize.define('company', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('unactive', 'active'),
            defaultValue: 'unactive'
        },
        token: {
            type: DataTypes.VIRTUAL
        },
        actions:{
            type:DataTypes.VIRTUAL,
            get(){
                const acl={
                    unactive:['read'],
                    active:['read','write','update','delete','send']
                }
                return acl[this.role];
            }
        }
    })
    company.auth = async function (email, hashedPassword) {
        try {
            let userD = await this.findOne({ where: { email: email } });
            if (userD) {
                let valid = await bcrypt.compare(hashedPassword, userD.password);
                if (valid) {
                    let newToken = jwt.sign({ email: userD.email }, secret)
                    userD.token = newToken;
                    return userD;
                }
                else {
                    return "wrong password!";

                }
            } else {
                return "invalid user!";
            }
        }
        catch (err) {
            return err;
        }
    }


    return company;
};

module.exports = company;
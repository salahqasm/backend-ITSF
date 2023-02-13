"use strict";
require('dotenv').config();
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const doctor = (sequelize, DataTypes) => {
    const doctor = sequelize.define('doctor', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true
        },
        fname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lname:{
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
        department: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.VIRTUAL
        },
        role: {
            type: DataTypes.ENUM('admin', 'doctor'),
            defaultValue: 'doctor'
        },
        actions:{
            type:DataTypes.VIRTUAL,
            get(){
                const acl={
                    admin:['read','write','update','delete','send'],
                    doctor:['read','write','update','delete','send']
                }
                return acl[this.role];
            }
        }
    })
    doctor.auth = async function (email, hashedPassword) {
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


    return doctor;
};

module.exports = doctor;
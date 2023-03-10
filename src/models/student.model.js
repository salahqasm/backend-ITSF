"use strict";
require('dotenv').config();
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const student = (sequelize, DataTypes) => {
    const student = sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
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
        approvedby: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        github: {
            type: DataTypes.STRING,
            allowNull: true
        },
        about:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        phoneNum:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        profilePicture: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('unactive', 'active'),
            defaultValue: 'unactive'
        },
        token: {
            type: DataTypes.VIRTUAL
        },
        actions: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    unactive: ['read'],
                    active: ['read', 'write', 'update', 'delete', 'send']
                }
                return acl[this.role];
            }
        }
    })
    student.auth = async function (email, hashedPassword) {
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


    return student;
};

module.exports = student;
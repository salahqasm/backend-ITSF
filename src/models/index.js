"use strict";

const {Sequelize,DataTypes}=require("sequelize");
const users=require("./users.module.js")
const student=require("./student.model.js");
const company=require("./company.model.js")
const doctor=require("./doctor.model.js")
const psql=process.env.DATABASE_URL

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};

const sequelize=new Sequelize(psql,sequelizeOptions);

module.exports={
    db:sequelize,
    student:student(sequelize,DataTypes),
    company:company(sequelize,DataTypes),
    users:users(sequelize,DataTypes),
    doctor:doctor(sequelize,DataTypes)
}
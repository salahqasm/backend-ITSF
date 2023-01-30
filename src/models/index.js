"use strict";

const {Sequelize,DataTypes}=require("sequelize");
const student=require("./student.model.js");
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
    student:student(sequelize,DataTypes)
}
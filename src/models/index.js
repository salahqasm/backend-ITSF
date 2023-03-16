"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const users = require("./users.module.js")
const doctor = require("./doctor.model.js")
const feedback = require("./feedback.model.js");
const studentModel = require("./student.model.js");
const companyModel = require("./company.model.js");
const taskModel = require("./task.model.js");
const taskReq=require("./taskRequest.model.js");
const skillModel=require("./skill.model.js");
const studentskillsModel=require("./studentSkills.model.js")
const psql = process.env.DATABASE_URL
let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
const sequelize = new Sequelize(psql, sequelizeOptions);

const student= studentModel(sequelize, DataTypes);
const company= companyModel(sequelize, DataTypes);
const task=taskModel(sequelize, DataTypes);
const skill=skillModel(sequelize,DataTypes);
const studentskills=studentskillsModel(sequelize,DataTypes);

student.belongsToMany(skill,{through:studentskills});
skill.belongsToMany(student,{through:studentskills})

company.hasMany(task,{onDelete:"CASCADE",onUpdate:'CASCADE'});
task.belongsTo(company);

student.hasMany(task,{onDelete:"SET NULL",onUpdate:'CASCADE'});
task.belongsTo(student);


//relationships 
// const shop=shopModel(sequelize,DataTypes);
// const customer=customerModel(sequelize,DataTypes);
// const order=orderModel(sequelize,DataTypes);
// const owner=ownerModel(sequelize,DataTypes)


// shop.belongsToMany(customer,{through:order});
// customer.belongsToMany(shop,{through:order});
// owner.hasOne(shop);
// shop.belongsTo(owner);

module.exports = {
  sequelize: sequelize,
  users: users(sequelize, DataTypes),
  doctor: doctor(sequelize, DataTypes),
  feedback: feedback(sequelize, DataTypes),
  taskReq:taskReq(sequelize,DataTypes),
  studentskills,
  skill,
  student,
  company,
  task,
}
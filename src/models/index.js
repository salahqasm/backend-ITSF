"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const users = require("./users.module.js")
const feedback = require("./feedback.model.js");
const doctorModel = require("./doctor.model.js")
const studentModel = require("./student.model.js");
const companyModel = require("./company.model.js");
const taskModel = require("./task.model.js");
const taskReqModel = require("./taskReq.model.js");
const skillModel = require("./skill.model.js");
const studentskillsModel = require("./studentSkills.model.js")
const taskSkillsModel = require("./taskSkills");
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

const student = studentModel(sequelize, DataTypes);
const company = companyModel(sequelize, DataTypes);
const task = taskModel(sequelize, DataTypes);
const skill = skillModel(sequelize, DataTypes);
const studentskills = studentskillsModel(sequelize, DataTypes);
const taskReq = taskReqModel(sequelize, DataTypes);
const taskSkills = taskSkillsModel(sequelize, DataTypes);
const doctor = doctorModel(sequelize, DataTypes);

doctor.hasMany(student, { foreignKey: 'approvedby', onDelete: 'SET NULL' });
student.belongsTo(doctor, { foreignKey: 'approvedby' });

student.belongsToMany(skill, { through: studentskills });
skill.belongsToMany(student, { through: studentskills })

company.hasMany(task, { onDelete: "CASCADE", onUpdate: 'CASCADE' });
task.belongsTo(company);


student.hasMany(task, { onDelete: "SET NULL", onUpdate: 'CASCADE' });
task.belongsTo(student);

student.belongsToMany(task, { through: taskReq, as: "request", onDelete: "CASCADE" });
task.belongsToMany(student, { through: taskReq, as: "request", onDelete: "CASCADE" });

task.belongsToMany(skill, { through: taskSkills });
skill.belongsToMany(task, { through: taskSkills });

module.exports = {
  sequelize: sequelize,
  users: users(sequelize, DataTypes),
  feedback: feedback(sequelize, DataTypes),
  doctor,
  taskReq,
  studentskills,
  skill,
  student,
  company,
  task,
  taskReq
}
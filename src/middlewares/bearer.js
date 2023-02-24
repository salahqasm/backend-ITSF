"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { student, company, doctor, users } = require("../models/index.js");
//bearer token
module.exports = async (req, res, next) => {
  try {
    // console.log(req.headers["authorization"])
    if (req.headers["authorization"]) {
      let tokenside = req.headers.authorization.split(" ")[1];
      let tokenAfterVerify = jwt.verify(tokenside, secret);

      let userFind = await users.findOne({
        where: { email: tokenAfterVerify.email },
      });

      if (userFind) {
        if (userFind.userType == "student") {
          let studentAcc = await student.findOne({ where: { email: tokenAfterVerify.email } })
          req.user = studentAcc;
          next();
        } else if (userFind.userType == "company") {
          let companyAcc = await company.findOne({ where: { email: tokenAfterVerify.email } })
          req.user = companyAcc;
          next();
        } else if (userFind.userType == "doctor") {
          let doctorAcc = await doctor.findOne({ where: { email: tokenAfterVerify.email } })
          req.user = doctorAcc;
          next();
        }
      } else {
        next("unvalid token!");
      }
    } else {
      next("unvalid auth process!");
    }
  } catch (err) {
    next(err);
  }
};

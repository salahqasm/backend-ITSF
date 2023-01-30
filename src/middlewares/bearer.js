"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { student } = require("../models/index.js");
//bearer token
module.exports = async (req, res, next) => {
  try {
    console.log(req.headers["authorization"])
    if (req.headers["authorization"]) {
      let tokenside = req.headers.authorization.split(" ")[1];
      let tokenAfterVerify =  jwt.verify(tokenside, secret);
      console.log("inside bearer");
      let userFind = await student.findOne({
        where: { email: tokenAfterVerify.email },
      });

      if (userFind) {

        req.user=userFind;
       
        next();
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

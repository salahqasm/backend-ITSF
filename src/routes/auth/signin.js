'use strict';
const express = require("express");
const base64 = require("base-64")
const router = express.Router();
const { company, student, doctor, users } = require("../../models/index.js");

router.post('/signin', signIn);

async function signIn(req, res) {
    if (req.headers['authorization']) {
        let base = req.headers.authorization.split(' ');
        let userpassEncoded = base.pop();
        let userpassDecoded = base64.decode(userpassEncoded).split(':');
        let [email, hashedPassword] = userpassDecoded;
        let userD = await users.findOne({ where: { email: email } });
        let obj = {};
        if (userD) {
            if (userD.userType == 'student') {
                student.auth(email, hashedPassword).then(
                    result => {
                        try {

                            delete result.dataValues.password;
                            result.dataValues.userType = "student";
                            res.send(result.dataValues);
                        } catch (err) {
                            res.send("Wrong Password")
                        }
                    }
                ).catch(err => { throw err; })

            } else if (userD.userType == 'company') {
                company.auth(email, hashedPassword).then(
                    result => {
                        try {
                            delete result.dataValues.password;
                            result.dataValues.userType = "company";
                            res.send(result.dataValues);
                        } catch (err) {
                            res.send("Wrong Password");
                        }
                    }).catch(err => { throw err; })
            } else if (userD.userType == 'doctor') {
                doctor.auth(email, hashedPassword).then(
                    result => {
                        try {
                            delete result.dataValues.password;
                            result.dataValues.userType = result.dataValues.role == "admin" ? "admin" : "doctor";
                            res.send(result.dataValues);

                        } catch (err) {
                            res.send("Wrong Password")
                        }
                    }).catch(err => { throw err; })
            } else {
                console.log("ERROR");
            }
        } else {
            res.send("user not found!")
        }
    } else {
        res.send("Headers Erorr!")
    }


}

module.exports = router;
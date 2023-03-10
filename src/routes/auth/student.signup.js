'use strict';
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { student, users } = require("../../models/index.js");
router.post('/StudentSignup', signUp);

require('dotenv').config();
const secret = process.env.SECRET;

async function signUp(req, res) {
    let { email, password, name, skill, role } = req.body;
    let hashed = await bcrypt.hash(password, 5);
    let studentAcc = await student.findOne({ where: { email: email } });
    let userAcc = await users.findOne({ where: { email: email } });
    if (!studentAcc && !userAcc) {
        try {
            await student.create({
                email: email,
                password: hashed,
                name: name,
                skill: skill,
                role: role,
            }).then(result => {
                delete result.dataValues.password;
                result.dataValues.token = jwt.sign({ email: email }, secret),
                    result.dataValues.userType = "student";
                res.send(result.dataValues);
            })
            await users.create({
                userType: "student",
                email: email
            })
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(409).send("failed");
    }
}

//basic #username:password
// async function signIn(req,res){
//     if(req.headers['authorization']){
//         let base=req.headers.authorization.split(' ');
//         let userpassEncoded=base.pop();
//         let userpassDecoded=base64.decode(userpassEncoded).split(':');
//         let [email,hashedPassword]=userpassDecoded;
//         student.auth(email,hashedPassword).then(result=>{res.send(result)}).catch(err=>{throw err;})
//     }else{
//         res.send("Invalid signin trial")
//     }


// }


module.exports = router;
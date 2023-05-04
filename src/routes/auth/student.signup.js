'use strict';
require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { student, users, skill, studentskills } = require("../../models/index.js");

router.post('/StudentSignup', signUp);
const secret = process.env.SECRET;
async function signUp(req, res) {
    let { email, password, name, role, skillsID, purl, github, profilePicture, linkedin, about,phoneNum } = req.body;
    let hashed = await bcrypt.hash(password, 5);
    let studentAcc = await student.findOne({ where: { email: email } });
    let userAcc = await users.findOne({ where: { email: email } });
    if (!studentAcc && !userAcc) {
        try {
            const newStudent = await student.create({
                email: email,
                password: hashed,
                name: name,
                role: role,
                purl:purl,
                github:github,
                linkedin:linkedin,
                about:about,
                phoneNum:phoneNum,
                profilePicture:profilePicture
            })
            delete newStudent.dataValues.password;
            delete newStudent.dataValues.profilePicture;
            newStudent.dataValues.token = jwt.sign({ email: email }, secret);
            newStudent.dataValues.userType = "student";
            await users.create({
                userType: "student",
                email: email
            })
            skillsID = JSON.parse(skillsID)
            const ids = skillsID.map(str => parseInt(str));

            ids.forEach(async id => {
                const row = await skill.findOne({ where: { id } });
                await newStudent.addSkill(row);
            });
            res.send(newStudent);

        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    } else {
        res.status(409).send("failed");
    }
}

module.exports = router;
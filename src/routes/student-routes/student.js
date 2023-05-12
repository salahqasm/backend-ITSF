'use strict';
require('dotenv').config();
const express = require("express");
const router = express.Router();
const { student, skill, task, doctor, taskReq } = require("../../models/index.js");
const bearer = require("../../middlewares/bearer.js");
router.get('/student/:id?', bearer, getStudent);
router.put('/student/:id?', bearer, updateStudent);
router.post('/deleteRequest', bearer, deleteRequest);
router.get('/viewStudent/:id', viewStudent);
router.post('/studentbyemail', bearer, getByEmail)
async function getStudent(req, res) {
    if (req.params.id) {
        try {
            const response = await student.findOne({
                where: { id: req.params.id },
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: task,
                        include: { model: skill }
                    },
                    {
                        model: task, as: "request",
                        include: { model: skill }
                    },
                    { model: skill },
                    { model: doctor, attributes: { exclude: ['password'] } }]
            });
            response.dataValues.userType = 'student';
            res.send(response);
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    } else {
        try {
            res.send(await student.findAll({
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: task,
                        include: { model: skill }
                    },
                    { model: skill },
                    { model: doctor, attributes: { exclude: ['password'] } }]
            }))
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    }
}
async function getByEmail(req, res) {
    try {
        let std = await student.findOne({ where: { email: req.body.email }, include: [{ model: skill }, { model: doctor }], attributes: { exclude: ['password'] } })
        if (std) {
            res.send(std);
        } else {
            res.send("Not Found!");
        }
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
async function viewStudent(req, res) {
    try {
        const response = await student.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: task,
                    include: { model: skill }
                },
                { model: skill },
                { model: doctor, attributes: { exclude: ['password'] } }]
        });
        res.send(response);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
async function updateStudent(req, res) {
    try {
        const { name, phoneNum, purl, linkedin, github, about, picture, skills } = req.body;

        let result = await student.update({
            name: name,
            phoneNum: phoneNum,
            purl: purl,
            linkedin: linkedin,
            github: github,
            about: about,
            profilePicture: picture
        }, { where: { id: req.params.id } });
        let st = await student.findOne({ where: { id: req.params.id } });
        st.setSkills([]);
        skills.forEach(async id => {
            const skl = await skill.findOne({ where: { id } });
            await st.addSkill(skl);
        });
        res.send("Success")
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}

async function deleteRequest(req, res) {
    try {
        const { taskID, studentEmail } = req.body;
        console.log(req.body);
        let record = await taskReq.destroy({ where: { studentEmail: 'salah@email.com', taskId: taskID } });
        res.send("success")
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
module.exports = router;

'use strict';
require('dotenv').config();
const express = require("express");
const router = express.Router();
const { student, skill, task } = require("../../models/index.js");

router.get('/student/:id?', getStudent);

async function getStudent(req, res) {
    if (req.params.id) {
        try {
            const response = await student.findOne({
                where: { id: req.params.id },
                attributes: { exclude: ['password'] },
                include: [{
                    model: task,
                    include: { model: skill }
                }, { model: task, as: "request" }, { model: skill }]
            });
            response.dataValues.userType = 'student';
            res.send(response);
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    } else {
        try {
            res.send(await student.findAll())
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    }
}
module.exports = router;

'use strict';
require('dotenv').config();
const express = require("express");
const router = express.Router();
const { student, skill } = require("../../models/index.js");

router.get('/student/:id?', getStudent);

async function getStudent(req, res) {
    if (req.params.id) {
        res.send(await student.findOne({ where: { id: req.params.id }, include: skill }));
    } else {
        res.send(await student.findAll({include:skill}));
    }
}
module.exports = router;
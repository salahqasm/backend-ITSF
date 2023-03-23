const express = require("express");

const router = express.Router();
const { task, company, student, skill, studentskills } = require("../models/index.js");

router.post("/test", getDoctor);

async function getDoctor(req, res) {
    try {

    } catch (err) {
        console.log(err.message);
        res.send("Error")
    }
}

module.exports = router;
const express = require("express");

const router = express.Router();
const { task, company, student, skill, studentskills, taskReq, doctor } = require("../models/index.js");

router.post("/test", getDoctor);

async function getDoctor(req, res) {
    try {
        let st = await student.findOne({ where: { id: 1 },include:{model:doctor} });
        // let doc = await doctor.findOne({ where: { id: 2 } });
        // doc.addStudent(st);
        res.send(st)
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
}

module.exports = router;
const express = require("express");
const bearer = require("../../middlewares/bearer.js");
const router = express.Router();
const { doctor, student, skill, task } = require("../../models/index.js");

router.get("/doctor/:id", bearer, getDoctor);
router.put("/doctor/:id", bearer, updateDoctor)
router.put("/approveStudent", bearer, approveStudent)
async function getDoctor(req, res) {
    try {
        const id = req.params.id;
        const doc = await doctor.findOne({
            where: { id: id },
            attributes: { exclude: ['password'] }
        });
        delete doc.dataValues.password;
        doc.dataValues.userType = "doctor";
        res.send(doc.dataValues);
    } catch (err) {
        console.log(err);
        res.send("Error")
    }
}

async function updateDoctor(req, res) {
    try {
        const { name, phoneNum, specialization, purl, about, picture } = req.body;
        let result = await doctor.update({
            name: name,
            phoneNum: phoneNum,
            specialization: specialization,
            purl: purl,
            about: about,
            profilePicture: picture
        }, { where: { id: req.params.id } });
        res.send("Success")
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
async function approveStudent(req, res) {
    try {
        let std = await student.findOne({ where: { id: req.body.studentId } })
        let doc = await doctor.findOne({ where: { id: req.body.doctorId } })
        std.update({ role: "active" });
        doc.addStudent(std);
        res.send("success");
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
module.exports = router;
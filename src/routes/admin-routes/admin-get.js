const express = require("express");
const { company, student, doctor, users } = require("../../models/index.js");
const bearerauth = require("../../middlewares/bearer.js")
const aclMiddleware = require('../../middlewares/acl.js');
const router = express.Router();
router.use(bearerauth);

router.get('/allstudents', aclMiddleware('admin'), getAllStudents)
router.get('/allcompanies', aclMiddleware('admin'), getAllCompanies)
router.get('/alldoctors', aclMiddleware('admin'), getAllDoctors)

async function getAllStudents(req, res) {
    let userD = await student.findAll();
    res.status(200).json(userD);

}

async function getAllCompanies(req, res) {
    let userD = await company.findAll();
    res.status(200).json(userD);

}

async function getAllDoctors(req, res) {
    let userD = await doctor.findAll();
    res.status(200).json(userD);

}



module.exports = router;
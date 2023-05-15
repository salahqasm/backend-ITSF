const express = require("express");
const { company, student, doctor, users, task } = require("../../models/index.js");
const bearerauth = require("../../middlewares/bearer.js")
const aclMiddleware = require('../../middlewares/acl.js');
const router = express.Router();
router.use(bearerauth);

router.get('/allstudents', aclMiddleware('admin'), getAllStudents)
router.get('/allcompanies', aclMiddleware('admin'), getAllCompanies)
router.get('/alldoctors', aclMiddleware('admin'), getAllDoctors)
router.get('/alltasks', getAllTasks)
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

async function getAllTasks(req, res) {
    try {
        const result = await task.findAll({
            include: [
                { model: student, attributes: { exclude: ['password'] } },
                { model: company, attributes: { exclude: ['password'] } }
            ]
        })
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}


module.exports = router;
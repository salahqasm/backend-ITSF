const express = require("express");
const { company, student, doctor, users, task } = require("../../models/index.js");
const bearerauth = require("../../middlewares/bearer.js")
const aclMiddleware = require('../../middlewares/acl.js');
const router = express.Router();
router.use(bearerauth);

router.delete('/deletestudent/:id', aclMiddleware('admin'), deleteStudent)
router.delete('/deletecompany/:id', aclMiddleware('admin'), deleteCompany)
router.delete('/deletedoctor/:id', aclMiddleware('admin'), deleteDoctor)
router.delete('/deleteTask/:id', deleteTask);
async function deleteCompany(req, res) {
    try {
        let userD = await company.findOne({ where: { id: req.params.id } });
        if (userD) {
            await company.destroy({
                where: { id: req.params.id },
            });
            await users.destroy({
                where: { email: userD.email },
            });
            res.send(await company.findAll())
        } else {
            throw err;
        }
    } catch (err) {
        console.log(err);
        res.send({
            "error": err
        })
    }
}

async function deleteDoctor(req, res) {
    try {
        let userD = await doctor.findOne({ where: { id: req.params.id } });
        if (userD) {
            await doctor.destroy({
                where: { id: req.params.id },
            });
            await users.destroy({
                where: { email: userD.email },
            });
            res.send(await doctor.findAll())
        } else {
            throw err;
        }
    } catch (err) {
        console.log(err);
        res.send({
            "error": err
        })
    }
}

async function deleteStudent(req, res) {
    try {
        let userD = await student.findOne({ where: { id: req.params.id } });
        if (userD) {
            await student.destroy({
                where: { id: req.params.id },
            });
            await users.destroy({
                where: { email: userD.email },
            });
            res.send(await student.findAll())
        } else {
            throw err;
        }
    } catch (err) {
        console.log(err);
        res.send({
            "error": err
        })
    }
}

async function deleteTask(req, res) {
    try {
        let tk = await task.destroy({ where: { id: req.params.id } });
        res.send("success");
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}

module.exports = router;
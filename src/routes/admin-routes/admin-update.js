const express = require("express");
const { company, student, doctor, users } = require("../../models/index.js");
const bearerauth = require("../../middlewares/bearer.js")
const aclMiddleware = require('../../middlewares/acl.js');
const router = express.Router();
router.use(bearerauth);

router.put('/updatestudent/:id', aclMiddleware('admin'), updateStudent)
router.put('/updatecompany/:id', aclMiddleware('admin'), updateCompany)
router.put('/updatedoctor/:id', aclMiddleware('admin'), updateDoctor)
router.put('/activeCompany/:id', activeCompany);
async function updateCompany(req, res) {
    const { name, email, specialization, country, city, role } = req.body;
    let user = await users.findOne({ where: { email: email } });
    if (user && user.userType != "company") {
        res.send("Email already exists");
    } else if (user && user.userType == "company") {
        let com = await company.findOne({ where: { email: email } });
        if (req.params.id == com.id) {
            try {
                let comAcc = await company.findOne({ where: { id: req.params.id } })
                await company.update({
                    name: name,
                    email: email,
                    specialization: specialization,
                    country: country,
                    city: city,
                    role: role
                }, {
                    where: { id: req.params.id }
                })
                await users.update({
                    email: email
                }, {
                    where: { email: comAcc.email }
                })
                res.send("Success")
            } catch (err) {
                console.log(err);
            }
        } else {
            res.send("Email already exists")
        }
    } else {
        try {
            let comAcc = await company.findOne({ where: { id: req.params.id } })
            await company.update({
                name: name,
                email: email,
                specialization: specialization,
                country: country,
                city: city,
                role: role
            }, {
                where: { id: req.params.id }
            })
            await users.update({
                email: email
            }, {
                where: { email: comAcc.email }
            })
            res.send("Success")
        } catch (err) {
            console.log(err);
        }
    }
}
async function updateDoctor(req, res) {
    const { name, email, specialization, department, role } = req.body;
    let user = await users.findOne({ where: { email: email } });
    if (user && user.userType != "doctor") {
        res.send("Email already exists");
    } else if (user && user.userType == "doctor") {
        let doc = await doctor.findOne({ where: { email: email } });
        if (req.params.id == doc.id) {
            try {
                let docAcc = await doctor.findOne({ where: { id: req.params.id } })
                await doctor.update({
                    name: name,
                    email: email,
                    specialization: specialization,
                    department: department,
                    role: role
                }, {
                    where: { id: req.params.id }
                })
                await users.update({
                    email: email
                }, {
                    where: { email: docAcc.email }
                })
                res.send("Success")
            } catch (err) {
                console.log(err);
            }
        } else {
            res.send("Email already exists")
        }
    } else {
        try {
            let docAcc = await doctor.findOne({ where: { id: req.params.id } })
            await doctor.update({
                name: name,
                email: email,
                specialization: specialization,
                department: department,
                role: role
            }, {
                where: { id: req.params.id }
            })
            await users.update({
                email: email
            }, {
                where: { email: docAcc.email }
            })
            res.send("Success")
        } catch (err) {
            console.log(err);
        }
    }
}
async function updateStudent(req, res) {
    const { name, email, approvedby, role } = req.body;
    let user = await users.findOne({ where: { email: email } });
    if (user && user.userType != "student") {
        res.send("Email already exists");
    } else if (user && user.userType == "student") {
        let stu = await student.findOne({ where: { email: email } });
        if (req.params.id == stu.id) {
            try {
                let stuAcc = await student.findOne({ where: { id: req.params.id } })
                await student.update({
                    name: name,
                    email: email,
                    approvedby: approvedby,
                    role: role
                }, {
                    where: { id: req.params.id }
                })
                await users.update({
                    email: email
                }, {
                    where: { email: stuAcc.email }
                })
                res.send("Success")
            } catch (err) {
                console.log(err);
            }
        } else {
            res.send("Email already exists")
        }
    } else {
        try {
            let stuAcc = await student.findOne({ where: { id: req.params.id } })
            await student.update({
                name: name,
                email: email,
                approvedby: approvedby,
                role: role
            }, {
                where: { id: req.params.id }
            })
            await users.update({
                email: email
            }, {
                where: { email: stuAcc.email }
            })
            res.send("Success")
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    }
}
async function activeCompany(req, res) {
    try {
        const cmp = await company.findOne({ where: { id: req.params.id } });
        cmp.update({ role: "active" });
        res.send(await company.findAll({ attributes: { exclude: ['password'] } }));
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
module.exports = router;
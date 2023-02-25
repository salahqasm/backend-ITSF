const express = require("express");
const { company, student, doctor, users } = require("../../models/index.js");
const bearerauth = require("../../middlewares/bearer.js")
const aclMiddleware = require('../../middlewares/acl.js');
const router = express.Router();
router.use(bearerauth);

// router.get('/allstudents', aclMiddleware('admin'), getAllStudents)
router.delete('/deletecompany/:id', aclMiddleware('admin'), deleteCompany)
// router.get('/alldoctors', aclMiddleware('admin'), getAllDoctors)

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
            res.send({
                "Status":"Success",
                "message":`company with id ${req.params.id} deleted successfuly.`
            })
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



module.exports = router;
'use strict';
const express = require("express");
const router = express.Router();
const { doctor, company, student } = require("../../models/index.js");
const bearer=require("../../middlewares/bearer");
router.use(bearer);
router.post('/profilePicture', profilePicture);
router.post('/profilePicture/:id',getProfilePicture);
// router.get('/profilePicture',getProfilePicure);
async function profilePicture(req, res) {
    const { userType, id, profilePicture } = req.body;
    try {
        if (userType === "student") {
            
            await student.update({
                profilePicture: profilePicture
            }, { where: { id: id } })
        } else if (userType === "company") {
            await company.update({
                profilePicture: profilePicture
            }, { where: { id: id } })
        } else if (userType === "doctor") {
            await doctor.update({
                profilePicture: profilePicture
            }, { where: { id: id } })
        }
        res.send("Success")
    } catch (err) {
        console.log(err);
        res.send("failed")
    }

}

async function getProfilePicture(req, res) {

    const { userType } = req.body;
    if (userType === "student" && req.params.id) {
        try {
            const profilePicture = await student.findOne({
                attributes: ['profilePicture'],
                where:{id:req.params.id}
            })
            res.send(profilePicture);
        } catch (err) {
            console.log(err);
            res.send("Error")
        }
    } else if (userType === "company"&& req.params.id) {

    } else if (userType === "doctor"&& req.params.id) {

    }
}

module.exports = router;
'use strict';
const express = require("express");
const router = express.Router();
const { doctor, company, student } = require("../../models/index.js");
router.post('/profilePicture', profilePicture);
// router.get('/profilePicture',getProfilePicure);
async function profilePicture(req, res) {
    const { userType, id, profilePicture } = req.body;
    try {
        if (userType === "student") {
            console.log("here")
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
    }catch(err){
        console.log(err);
        res.send("failed")
    }

}


module.exports = router;
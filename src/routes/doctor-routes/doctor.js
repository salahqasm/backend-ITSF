const express = require("express");
const bearer = require("../../middlewares/bearer.js");
const router = express.Router();
const { doctor } = require("../../models/index.js");

router.get("/doctor/:id", bearer, getDoctor);

async function getDoctor(req, res) {
    try {
        const id = req.params.id;
        const doc = await doctor.findOne({ where: { id: id } });
        delete doc.dataValues.password;
        res.send(doc.dataValues);
    } catch (err) {
        console.log(err);
        res.send("Error")
    }
}

module.exports = router;
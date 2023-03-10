'use strict';
const express = require("express");
const router = express.Router();
const { feedback } = require("../../models/index.js");
const bearer = require("../../middlewares/bearer");
router.use(bearer);
router.get('/getFeedback', getFeedback);
router.post('/setFeedback', setFeedback);
router.delete('/deleteFeedback/:id', deleteFeedback);


async function deleteFeedback(req, res) {
    try {
        let fb = await feedback.findOne({ where: { id: req.params.id } });
        if (fb) {
            await feedback.destroy({
                where: { id: req.params.id },
            });
            res.send(await feedback.findAll())
        } else {
            throw "feedback id is wrong";
        }
    } catch (err) {
        console.log(err);
        res.send({
            "error": err
        })
    }
}


async function getFeedback(req, res) {
    // const { email, title, message } = req.body;
    try {
        const result=await feedback.findAll();
        res.send(result)
    } catch (err) {
        console.log(err);
        res.send("Failed")
    }

}


async function setFeedback(req, res) {
    const { email, title, message } = req.body;
    try {
        if (email) {
            await feedback.create({
                email: email,
                title: title,
                message: message
            })
        } else {
            throw err;
        }
        res.send("Success")
    } catch (err) {
        console.log(err);
        res.send("Failed")
    }

}


module.exports = router;
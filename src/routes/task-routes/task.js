const express = require("express");
const router = express.Router();
const bearer = require("../../middlewares/bearer.js");
const { task, skill, company, student } = require("../../models/index.js");


router.get("/task", bearer, getTasks);
router.post("/taskRequest", bearer, requestTask);
router.put("/submittask/:id",bearer,submitHandler)

async function getTasks(req, res) {
    try {
        let result = await task.findAll({
            where: { status: "available" },
            include: [
                { model: skill },
                { model: company, attributes: { exclude: ['password'] } }
            ]
        })
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
}

async function requestTask(req, res) {
    try {
        let { studentID, taskID } = req.body;
        const std = await student.findOne({ where: { id: studentID } });
        std.addRequest(taskID);
        res.send("success");
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
}
async function submitHandler(req,res){
    try {
        let tk=await task.update({submission:req.body.submission},{where:{id:req.params.id}});
        console.log(`Task Submitted: ${req.param.id} : ${req.body.submission}`);
        res.send("success");
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
}
module.exports = router;
const express = require("express");

const router = express.Router();
const { task, company, student, skill, studentskills, taskReq } = require("../models/index.js");

router.post("/test", getDoctor);

async function getDoctor(req, res) {
    try {
        let tk=await task.findOne({where:{id:6}});
        let s=await student.findAll();
        await tk.addRequest(s);
        res.send("success")
        // const taskReqList = await task.findAll({
        //     include:
        //     [{
        //         model: student,
        //         as:"request"
        //     },{
        //         model:student
        //     }]});
        // res.send(taskReqList)
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
}

module.exports = router;
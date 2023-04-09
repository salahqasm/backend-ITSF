const express = require("express");

const router = express.Router();
const { task, company, student, skill, studentskills, taskReq } = require("../models/index.js");

router.post("/test", getDoctor);

async function getDoctor(req, res) {
    try {
        // let tk=await task.findOne({where:{title:"Wireframe"}});
        // let s=await skill.findAll();
        // await tk.addSkills(s);
        // res.send("success")
        const tk = await task.findOne({ where: { title: "First Edit task" }, include: { model: skill } });
        // await tk.setSkills([]);
        res.send(tk)
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
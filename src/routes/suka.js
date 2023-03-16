const express = require("express");

const router = express.Router();
const { task, company, student ,skill,studentskills} = require("../models/index.js");

router.post("/test", getDoctor);

async function getDoctor(req, res) {
    try {
        // let { title, description, credit, date } = req.body
        // let resl = await task.create({
        //     title: title,
        //     description: description,
        //     credit: credit,
        //     date: date
        // })
        // res.send(resl);
        // company.bulkCreate([
        //     {
        //         email: "avertra@email.com",
        //         password: "123",
        //         name: "avertra",
        //         specialization: "mendix" ,
        //         country:"jordan",
        //         city:"amman" 
        //     },{
        //         email: "aspire@email.com",
        //         password: "123",
        //         name: "asprire",
        //         specialization: "js",
        //         country:"jordan",
        //         city:"amman"
        //     },{
        //         email: "estarta@email.com",
        //         password: "123",
        //         name: "estarta",
        //         specialization: "network",
        //         country:"jordan",
        //         city:"amman"
        //     }
        // ])

        // student.bulkCreate([
        //     {
        //         email: "salah@email.com",
        //         password: "123",
        //         name: "salah",
        //         skill: "js"  
        //     },{
        //         email: "noor@email.com",
        //         password: "123",
        //         name: "noor",
        //         skill: "mendix"  
        //     },{
        //         email: "ahmad@email.com",
        //         password: "123",
        //         name: "ahmad",
        //         skill: "js"  
        //     }
        // ])
        // res.send("success")
        // let r=await skill.bulkCreate([
        //     {
        //         name:"javascript"
        //     },
        //     {
        //         name:"react"
        //     },
        //     {
        //         name:"node"
        //     },
        //     {
        //         name:"java"
        //     },
        //     {
        //         name:"mendix"
        //     }
        // ]);
        let stu=await student.findOne({where:{name:"salah"},include:skill});
        // stu.addSkills(r);
        // let tk = await task.bulkCreate([{
        //     title: "network",
        //     description: "This is a test network task",
        //     credit: 20,
        //     date: "2023-4-15"
        // }, {
        //     title: "network1",
        //     description: "This is a test network task1",
        //     credit: 30,
        //     date: "2023-4-17"
        // }, {
        //     title: "network2",
        //     description: "This is a test network task2",
        //     credit: 40,
        //     date: "2023-4-23"
        // }
        // ]);
        // let com = await company.findOne({ where: { name: "asprire" } });
        // com.addTasks(tk);
        // stu.addTasks(tk);
        res.send(stu)
    } catch (err) {
        console.log(err.message);
        res.send("Error")
    }
}

module.exports = router;
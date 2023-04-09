const express = require("express");
const bearer = require("../../middlewares/bearer.js");
const { company, task, skill, student } = require("../../models/index.js");
const router = express.Router();

router.get('/company/:id?', bearer, getCompany);
router.post('/addtask/:id', bearer, addTask);
router.delete('/deletetask/:id', bearer, deleteTask)
router.put('/company/:id', bearer, updateCompany);
router.put('/edittask/:id', bearer, updateTask);

async function getCompany(req, res) {
    if (req.params.id) {
        try {
            const response = await company.findOne({
                where: { id: req.params.id },
                attributes: { exclude: ['password'] },
                include: {
                    model: task,
                    include: [{ model: skill }, { model: student, as: "request", attributes: { exclude: ['password'] } }]
                }
            });
            response.dataValues.userType = 'company';
            res.send(response);

        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    } else {
        try {
            res.send(await company.findAll())
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    }
}
async function updateCompany(req, res) {
    try {
        const { name, phoneNum, specialization, country, city, purl, about, picture } = req.body;
        let result = await company.update({
            name: name,
            phoneNum: phoneNum,
            specialization: specialization,
            country: country,
            city: city,
            purl: purl,
            about: about,
            profilePicture: picture
        }, { where: { id: req.params.id } });
        res.send("Success")
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
async function addTask(req, res) {
    try {
        const { title, description, credit, date, requiredSkills } = req.body;
        const tk = await task.create({
            title: title,
            description: description,
            credit: credit,
            date: date
        });
        const comp = await company.findOne({ where: { id: req.params.id } });
        await comp.addTask(tk);

        requiredSkills.forEach(async id => {
            const skl = await skill.findOne({ where: { id } });
            await tk.addSkill(skl);
        });
        res.send(await task.findAll({ where: { companyEmail: comp.email }, include: { model: skill, required: true } }));
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

async function deleteTask(req, res) {
    try {
        await task.destroy({ where: { id: req.params.id } })
        res.send("deleted")
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}
async function updateTask(req, res) {
    try {
        const { title, description, credit, date, requiredSkills } = req.body;
        let result = await task.update({
            title: title,
            description: description,
            credit: credit,
            date: date
        }, { where: { id: req.params.id } });
        let tk=await task.findOne({where:{id:req.params.id}});
        await tk.setSkills([]);
        requiredSkills.forEach(async id => {
            const skl = await skill.findOne({ where: { id } });
            await tk.addSkill(skl);
        });
        res.send("Success")
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
module.exports = router;

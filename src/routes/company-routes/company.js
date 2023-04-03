const express = require("express");
const bearer = require("../../middlewares/bearer.js");
const { company, task, skill } = require("../../models/index.js");
const router = express.Router();

router.get('/company/:id?', bearer, getCompany);
router.post('/addtask/:id', bearer, addTask)
async function getCompany(req, res) {
    if (req.params.id) {
        try {
            const response = await company.findOne({
                where: { id: req.params.id },
                attributes: { exclude: ['password'] },
                include: {
                model: task,
                include: { model: skill }
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

module.exports = router;

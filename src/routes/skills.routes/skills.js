'use strict';
const express = require("express");
const router = express.Router();
const { skill } = require("../../models/index.js");
const bearer = require("../../middlewares/bearer");
// router.use(bearer);

router.post('/addSkill', addSkill);
router.get('/getSkill/:id?', getSkill);
router.delete('/deleteSkill/:id', deleteSkill);
router.post('/resetSkill', resetSkills);
async function resetSkills(req, res) {
    try {
        await skill.destroy({where:{}});
        await skill.bulkCreate([
            {
                name: "React",
                category: "Front-End"
            }, {
                name: "Node.js",
                category: "Back-End"
            }, {
                name: "Java",
                category: "Back-End"
            }, {
                name: "Flutter",
                category: "Mobile Application"
            }, {
                name: "Figma",
                category: "UI/UX"
            }, {
                name: "Photoshop",
                category: "Image Processing"
            }, {
                name: "Video Editing",
                category: "Multimedia"
            }
        ]);
        res.send(await skill.findAll());
    } catch (err) {
        res.send(err.message)
    }
}

async function addSkill(req, res) {
    try {
        let { name, category } = req.body;
        let sk = await skill.findOne({ where: { name: name } });
        if (sk) {
            res.send("Skill already exists")
        } else {
            await skill.create({
                name: name,
                category: category
            })
            res.send(await skill.findAll());
        }

    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
}

async function getSkill(req, res) {
    try {
        if (req.params.id) {
            res.send(await skill.findOne({ where: { id: req.params.id } }))
        } else {
            res.send(await skill.findAll())
        }
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }

}


async function deleteSkill(req, res) {
    try {
        await skill.destroy({ where: { id: req.params.id } });
        res.send(await skill.findAll());
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }

}


module.exports = router;
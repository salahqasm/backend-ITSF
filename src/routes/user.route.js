"use strict";

const express=require("express");
const {student}=require("../models/index.js");
const bearerauth=require("../middlewares/bearer.js")
const aclMiddleware=require('../middlewares/acl.js');
const router=express.Router();
router.use(bearerauth);


router.get('/student',aclMiddleware('read'),getAllStudents);
// router.get('/student',getAllStudents);

router.get('/user/:id',getUserByNumber);

router.put('/user/:id',updateUser);

router.delete('/user/:id',deleteUser);

async function deleteUser(req,res){
    let username=req.params.username;
    let userD=await user.destroy({where:{username:username}});
    // res.send(friend);
    res.send("Done")
}

async function updateUser(req,res){
    let username=req.params.username;
    let pre=await user.findOne({where:{username:username}});
    let userD=await user.upsert({
        username:req.body.username,
        password:req.nody.password
    });
    res.json(userD);
}

async function getUserByNumber(req,res){
    let username=req.params.id;
    let userD=await user.findOne({where:{username:username}});
    res.json(userD);
}

async function getAllStudents(req,res){
        let userD=await student.findAll();
        res.status(200).json(userD);
        
}

module.exports=router;
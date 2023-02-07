'use strict';
const express=require("express");
const bcrypt=require("bcrypt");
const base64=require("base-64")
const router=express.Router();
const {student}=require("../../models/index.js");

router.post('/StudentSignup',signUp);
router.post('/StudentSignin',signIn);


async function signUp(req,res){
    let {email,password,fname,sname,lname,role}=req.body;
    let hashed=await bcrypt.hash(password,5);
    let userD=await student.findOne({where:{email:email}});
    if(!userD){
        try{
            await student.create({
                email:email,
                password:hashed,
                fname:fname,
                sname:sname,
                lname:lname,
                role:role
            })
        }catch(err){
            console.log(err);
        }
        res.status(201).json(email);
    }else{
        res.status(409).send("failed");
    }
}

//basic #username:password
async function signIn(req,res){
    if(req.headers['authorization']){
        let base=req.headers.authorization.split(' ');
        let userpassEncoded=base.pop();
        let userpassDecoded=base64.decode(userpassEncoded).split(':');
        let [email,hashedPassword]=userpassDecoded;
        student.auth(email,hashedPassword).then(result=>{res.send(result)}).catch(err=>{throw err;})
    }else{
        res.send("Invalid signin trial")
    }


}


module.exports=router;
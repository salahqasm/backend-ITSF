'use strict';
const express=require("express");
const bcrypt=require("bcrypt");
const base64=require("base-64")
const router=express.Router();
const {company}=require("../../models/index.js");

router.post('/CompanySignup',signUp);
router.post('/CompanySignin',signIn);


async function signUp(req,res){
    let {name,email,password,specialization,country,city}=req.body;
    let hashed=await bcrypt.hash(password,5);
    let userD=await company.findOne({where:{email:email}});
    if(!userD){
        try{
            await company.create({
                name:name,
                email:email,
                password:hashed,
                specialization:specialization,
                country:country,
                city:city
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
        company.auth(email,hashedPassword).then(result=>{res.send(result)}).catch(err=>{throw err;})
    }else{
        res.send("Invalid signin trial")
    }


}


module.exports=router;
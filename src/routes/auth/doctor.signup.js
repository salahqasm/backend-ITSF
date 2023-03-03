'use strict';
const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const {doctor,users}=require("../../models/index.js");
router.post('/DoctorSignup',signUp);

async function signUp(req,res){
    let {fname,lname,email,password,specialization,department,role}=req.body;
    if(!role){
        role="doctor";
    }
    let hashed=await bcrypt.hash(password,5);
    let docAcc=await doctor.findOne({where:{email:email}});
    let userAcc=await users.findOne({where:{email:email}});
    if(!docAcc && !userAcc){
        try{
            await doctor.create({
                fname:fname,
                lname:lname,
                email:email,
                password:hashed,
                specialization:specialization,
                department:department,
                role:role
            })
            await users.create({
                userType:"doctor",
                email:email
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
// async function signIn(req,res){
//     if(req.headers['authorization']){
//         let base=req.headers.authorization.split(' ');
//         let userpassEncoded=base.pop();
//         let userpassDecoded=base64.decode(userpassEncoded).split(':');
//         let [email,hashedPassword]=userpassDecoded;
//         company.auth(email,hashedPassword).then(result=>{res.send(result)}).catch(err=>{throw err;})
//     }else{
//         res.send("Invalid signin trial")
//     }


// }


module.exports=router;
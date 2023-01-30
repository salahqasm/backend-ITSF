"use strict";

module.exports=(req,res,next)=>{
    let date=new Date().toLocaleDateString();
    console.log(`new log on: ${date}`);
    next();
}
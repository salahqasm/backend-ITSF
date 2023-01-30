"use strict";

let pageNotFound=function(req,res,next){
    res.status(404).json({
        code:404,
        message:"Page Not Found!"
    })
}

module.exports=pageNotFound;
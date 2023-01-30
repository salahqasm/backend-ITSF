"use strict";

module.exports=(error,req,res,next)=>{
    res.status(500).json({
        code:500,
        message:"Sorry!...Server Error!",
        error:error
    })
}
"use strict";

const express=require("express");
const app=express();
const cors=require("cors");
const pageNotFound=require("./error-handlers/pageNotFound.js");
const serverError=require("./error-handlers/serverError.js");
const studentRoute=require("./routes/student.route.js");
const companyAuthRoute=require("./routes/auth/company.auth")
const logger=require("./middlewares/logger.js");
const studentAuthRoute=require("./routes/auth/student.auth");
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(studentAuthRoute);
app.use(companyAuthRoute);

app.use(studentRoute); 




app.get('/',(req,res)=>{
res.json({
"name":"salah",
"test":"123"
});
})










app.use('*',pageNotFound);
app.use(serverError);

const start=(port)=>{
    app.listen(port,()=>{
        console.log(`********************Server running on port: ${port}`);
    })
}


module.exports={
    app:app,
    start:start
}
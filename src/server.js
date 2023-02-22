"use strict";
const express=require("express");
const app=express();
const cors=require("cors");
//error handeling middlewares
const pageNotFound=require("./error-handlers/pageNotFound.js");
const serverError=require("./error-handlers/serverError.js");
//auth routes
const companySignup=require("./routes/auth/company.signup.js")
const studentSignup=require("./routes/auth/student.signup.js");
const doctorSignup=require("./routes/auth/doctor.signup.js");
const signin=require("./routes/auth/signin");

const studentRoute=require("./routes/student.route.js");
const logger=require("./middlewares/logger.js");//testing middleware

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(companySignup);
app.use(studentSignup);
app.use(doctorSignup);
app.use(signin);

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
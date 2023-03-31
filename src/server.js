"use strict";
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json({limit: '50mb'})); // for images suka
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
//error handeling middlewares
const pageNotFound = require("./error-handlers/pageNotFound.js");
const serverError = require("./error-handlers/serverError.js");
//auth routes(signup and signin)
const companySignup = require("./routes/auth/company.signup.js")
const studentSignup = require("./routes/auth/student.signup.js");
const doctorSignup = require("./routes/auth/doctor.signup.js");
const signin = require("./routes/auth/signin");
//admin routes
const adminGetRoutes = require("./routes/admin-routes/admin-get");
const adminDeleteRoutes= require("./routes/admin-routes/admin-delete")
const adminUpdateoutes=require("./routes/admin-routes/admin-update")
//profile picture
const profilePicture=require("./routes/profilePicture-route/profilePicture.js")
//trash routes for testing
const logger = require("./middlewares/logger.js");//testing middleware
const suka=require("./routes/suka.js")
//doctor routes
const doctor=require("./routes/doctor-routes/doctor")
//student routes
const studentRoutes=require("./routes/student-routes/student")
//company routes
const companyRoutes=require("./routes/company-routes/company");
//skill routes
const skillRoutes=require("./routes/skills-routes/skills")
//feedback routes
const feedback=require("./routes/feedback-routes/feedback.js")
app.use(logger);

//no bearer routes
app.use(signin);
app.use(companySignup);
app.use(studentSignup);
app.use(doctorSignup);
app.use(skillRoutes);
app.use(studentRoutes);
app.use(companyRoutes);
app.use(suka);

//bearer used
app.use(doctor);
app.use(adminGetRoutes);
app.use(adminDeleteRoutes);
app.use(adminUpdateoutes);
app.use(profilePicture);
app.use(feedback);












app.use('*', pageNotFound);
app.use(serverError);

const start = (port) => {
    app.listen(port, () => {
        console.log(`********************Server running on port: ${port}`);
    })
}


module.exports = {
    app: app,
    start: start
}
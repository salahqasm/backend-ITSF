"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
// app.use(express.json());
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
//trash
const studentRoute = require("./routes/student.route.js");
const logger = require("./middlewares/logger.js");//testing middleware
//profile picture
const profilePicture=require("./routes/profilePicture-route/profilePicture.js")

app.use(profilePicture);
app.use(companySignup);
app.use(studentSignup);
app.use(doctorSignup);
app.use(signin);
app.use(adminGetRoutes);
app.use(adminDeleteRoutes);



app.use(logger);
app.use(studentRoute);











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
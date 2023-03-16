
require("dotenv").config();

const server = require("./src/server.js");
const { sequelize } = require("./src/models/index.js")

// { force: true }
sequelize.sync().then(() => {
    server.start(process.env.PORT || 3001);
    console.log(`Database Connected Successfuly..............`);
})
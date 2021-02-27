const { User } = require("../models/user.model");

module.exports = app => {
    const user = require("../controllers/user.controller");
  
    // Test Method to Grab all Users
    app.get("/all", user.getAll);

    //Add New User
    app.post("/newUser/:fName&:lName&:email&:password", user.create);

    app.get("/login/:email&:password", user.login)};
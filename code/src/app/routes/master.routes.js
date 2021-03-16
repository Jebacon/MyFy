const { User } = require("../models/user.model");

module.exports = app => {
    const user = require("../controllers/user.controller");
    const housing = require("../controllers/housing.controller");
    const _income = require("../controllers/income.controller");
    // Test Method to Grab all Users
    app.get("/all", user.getAll);

    //Test method to grab all income entries
    app.get("/all", _income.getAll);

    //Add New User
    app.post("/newUser/:fName&:lName&:email&:password", user.create);

    //add new income entry
    app.post("/newIncome/:SRCNAME&:AMOUNT&:PAYCYCLE&:USERID", _income.create);

    app.get("/login/:email&:password", user.login)};
const { User } = require("../models/user.model");
const { Income } = require("../models/income.model");

module.exports = app => {
    const user = require("../controllers/user.controller");
    const income = require("../controllers/income.controller");


    //User CRUD Group
    // Test Method to Grab all Users
    app.get("/allUsers", user.getAll);

    //Add New User
    app.post("/newUser", user.create);

    app.post("/login", user.login);

    app.post("/updateEmail", user.updateEmail);

    app.post("/updatePassword", user.updatePassword);

    app.delete("/deleteUser", user.remove);

    //End User CRUD Group
    
    app.get("/allIncome", income.getAll);
    
};
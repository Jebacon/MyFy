const { User } = require("../models/user.model");
const { Income } = require("../models/income.model");

module.exports = app => {
    const user = require("../controllers/user.controller");
    const income = require("../controllers/income.controller");


    //User CRUD Group
    // Test Method to Grab all Users
    app.get("/allUsers", user.getAll);

    //Add New User
    app.post("/newUser/:fName&:lName&:email&:password", user.create);

    app.get("/login/:email&:password", user.login);

    app.post("/updateEmail/:email&:newEmail", user.updateEmail);

    app.post("/updatePassword/:email&:password", user.updatePassword);

    app.delete("/deleteUser/:email&:password", user.remove);

    //End User CRUD Group
    
    app.get("/allIncome", income.getAll);
    
};
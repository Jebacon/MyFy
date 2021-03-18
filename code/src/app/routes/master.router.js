const { User } = require("../models/user.model");
const { Income } = require("../models/income.model");

module.exports = app => {
    const user = require("../controllers/user.controller");
    const _income = require("../controllers/income.controller");


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
    
   
    //Test method to grab all income entries
    app.get("/allIncome", _income.getAll);

     //Income CRUD group
    app.post("/newIncome/:SRCNAME&:AMOUNT&:PAYCYCLE&:USERID", _income.create);    

    app.post("/updateById/:SRCNAME&:AMOUNT&:PAYCYCLE&:INCOMEID", _income.updateById);    

    app.delete("/deleteIncome/:INCOMEID", _income.remove);

    
};
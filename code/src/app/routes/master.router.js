const { User } = require("../models/user.model");
const { Income } = require("../models/income.model");

module.exports = app => {
    const user = require("../controllers/user.controller");
    const _income = require("../controllers/income.controller");


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
    
   
    //Test method to grab all income entries
    //Works
    app.get("/allIncome", _income.getAll);

     //Income CRUD group
     //Add new income source- works
    app.post("/newIncome/:SRCNAME&:AMOUNT&:PAYCYCLE&:USERID", _income.create);    

    app.post("/updateById/:SRCNAME&:AMOUNT&:PAYCYCLE&:INCOMEID&:USERID", _income.updateById);    
    // deletes entry of income source - working
    app.delete("/deleteIncome/:SRCNAME&:USERID", _income.remove);

    
};
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
    
   
    //Test method to grab all income entries - updated to body style syntax 3/23-JS
    //Works - before switch to body style - works after
    app.get("/allIncome", _income.getAll);

     //Income CRUD group
     //Add new income source- works  - before switch to body style - works after
    app.post("/newIncome",_income.create);    

    
    //working
    app.get("/findByIncomeId", _income.findByIncomeId);
    //Not working
    app.post("/updateIncome", _income.updateIncome);   
    
    
    // deletes entry of income source - working - before switch to body style
    app.delete("/deleteIncome", _income.remove);

    
};
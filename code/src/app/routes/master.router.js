const { User } = require("../models/user.model");
const { Income } = require("../models/income.model");
const { Housing } = require("../models/housing.model");

module.exports = app => {
    const user = require("../controllers/user.controller");
    const _income = require("../controllers/income.controller");
    const housing = require("../controllers/housing.controller");


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
    
    //Start Income CRUD Group

    //Test method to grab all income entries - updated to body style syntax 3/23-JS
    //Works 
    app.get("/allIncome", _income.getAll);

    //Add new income source
    //Works
    app.post("/newIncome",_income.create); 

    //Find an income entry by id      
    //working
    app.get("/findByIncomeId", _income.findByIncomeId);

    //Update an exisiting income entry
    // working
    app.post("/updateIncome", _income.updateIncome);    

    // deletes entry of income source - working 
    app.delete("/deleteIncome", _income.remove);
    //End of income CRUD group

    //#######################//

    //Start of HOUSING CRUD group
    //Test method to grab all housing entries
    // Works 
    app.get("/allHousing", housing.getAll);

    //Add new housing entry
    //Works
    app.post("/newHousing",housing.create); 

    //Find housing entry by id      
    //not working
    app.get("/findByHousingId", housing.findByHousingId);

    //Update an exisiting housing entry
    //not working
    //app.post("/updateHousing", housing.updateHousing);    

    // deletes entry of housing source - working 
    app.delete("/deleteHousing", housing.remove);
    //End of housing CRUD group


    
};
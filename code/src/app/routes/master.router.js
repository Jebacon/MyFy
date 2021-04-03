const { User } = require("../models/user.model");
const { Debt } = require("../models/debt.model");
const { Expenses } = require("../models/expenses.model");
const { Invest } = require("../models/invest.model");
const { Housing } = require("../models/housing.model");
const { Discr_expense } = require("../models/discr_expense.model");

module.exports = app => {
    const _user = require("../controllers/user.controller");
    const _debt = require("../controllers/debt.controller");
    const _expenses = require("../controllers/expenses.controller");
    const _invest = require("../controllers/invest.controller");
    const _housing = require("../controllers/housing.controller");
    const _discr_expense = require("../controllers/discr_expense.controller")

    //Begin User CRUD Group

    //Add New User
    app.post("/newUser", _user.create); //GTG

    //Login user, need username and password combination.
    app.post("/login", _user.login);

    //Updates Email of User
    app.post("/updateEmail", _user.updateEmail);

    //Updates Password of User
    app.post("/updatePassword", _user.updatePassword);

    app.post("/updatefName", _user.updatefName);

    app.post("/updatelName", _user.updatelName);

    //Remove User
    app.delete("/deleteUser", _user.remove);

    //End User CRUD Group
    

    //Begin Debt CRUD Group

    //Posts new Debt object to the database.
    app.post("/newDebt", _debt.create);

    //Get's all of a User's Debts.
    app.post("/getUserDebts", _debt.getUserDebts);

    //Updates a Debt object in the database.
    app.post("/updateDebts", _debt.updateDebt);

    ///Deletes a single debt object.
    app.delete("/deleteDebt", _debt.remove);

    //Deletes ALL debt objects for any user.
    app.delete("/deleteUserDebts", _debt.removeAll);


    //End Debt CRUD Group



    //Begin Expenses CRUD Group

    //Posts new Expense object to the database.
    app.post("/newExpense", _expenses.create); //GTG

    //Get's all of a User's Expenses.
    app.post("/getUserExpenses", _expenses.getUserExpense); //GTG

    //Updates an Expense object in the database.
    app.post("/updateExpense", _expenses.updateExpense); //GTG

    ///Deletes a single Expense object.
    app.delete("/deleteExpense", _expenses.remove); //GTG

    //Deletes ALL Expense objects for any user.
    app.delete("/deleteUserExpenses", _expenses.removeAll); //GTG

    //End Expenses CRUD Group


    //Begin Invest CRUD Group

    //Add New Investment to User.
    app.post("/newInvestment", _invest.create);

    //Get all User Investments.
    app.post("/getUserInvestments", _invest.getUserInvestments);

    //Updates an individual User investment.
    app.post("/updateInvestment", _invest.updateInvestments);

    //Deletes a single user investment.
    app.delete("/deleteInvestment", _invest.remove);

    //Deletes all User Investments.
    app.delete("/deleteUserInvestments", _invest.removeAll);

    //End Invest CRUD Group 

    //Begin Housing CRUD Group- ALL working 4/3

    //Add New Housing entry.- Works 4/3
    app.post("/newHousing", _housing.create);

    //Get all Housing entries. - Works 4/3
    app.get("/getAllHousing", _housing.getAll);

    //Updates an individual Hosuing entry.- Works 4/3
    app.post("/updateHousing", _housing.updateHousing);

    //Finds an individual Hosuing entry.- Works 4/3
    app.post("/findByUserId", _housing.findByUserId);

    //Deletes a single Housing entry.-Works 4/3
    app.delete("/deleteHousing", _housing.remove);

    //Deletes all Housing entries for a specific user.-Works 4/3
    app.delete("/deleteUserHousing", _housing.removeAll);

    //End Housing CRUD Group 


    //Begin Discr_exp CRUD Group - ALL working as of 4/3

    //Posts new Discr object to the database.-Working 4/3
    app.post("/newDiscr_Exp", _discr_expense.create);

    //Get's all of a User's Discr_Exp.-Working 4/3
    app.post("/getUserDiscr_Exp", _discr_expense.getUserDiscr_expense);

    //Updates a Discr_Exp object in the database.-Working 4/3
    app.post("/updateDiscrExp", _discr_expense.updateDiscrExp);

    ///Deletes a single discr_Exp object.-Working 4/3
    app.delete("/deleteDiscr_Exp", _discr_expense.remove);

    //Deletes ALL discr_exp objects for any user.-Working 4/3
    app.delete("/deleteUserDiscr_Exp", _discr_expense.removeAll);


    //End Discr_Exp CRUD Group

};

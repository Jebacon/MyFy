const { User } = require("../models/user.model");
const { Debt } = require("../models/debt.model");
const { Expenses } = require("../models/expenses.model");
const { Invest } = require("../models/invest.model");

module.exports = app => {
    const _user = require("../controllers/user.controller");
    const _debt = require("../controllers/debt.controller");
    const _expenses = require("../controllers/expenses.controller");
    const _invest = require("../controllers/invest.controller");


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

    app.post("/updateName", _user.updateName);

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

    //Grabs the sum of all investments.
    app.post("/getUserInvestmentSum", _invest.getUserInvestmentSum);

    //Updates an individual User investment.
    app.post("/updateInvestment", _invest.updateInvestments);

    //Deletes a single user investment.
    app.delete("/deleteInvestment", _invest.remove);

    //Deletes all User Investments.
    app.delete("/deleteUserInvestments", _invest.removeAll);

    //End Invest CRUD Group 
};
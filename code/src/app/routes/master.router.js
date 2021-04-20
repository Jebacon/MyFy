const { User } = require("../models/user.model");
const { Income } = require("../models/income.model");
const { Email } = require("nodemailer");

module.exports = app => {
    const user = require("../controllers/user.controller");
    //const _income = require("../controllers/income.controller");
    const _email = require("../controllers/email.controller");
    const debt = require("../controllers/debt.controller");
    const _expenses = require("../controllers/expenses.controller");
    const _invest = require("../controllers/invest.controller");
    const _income = require("../controllers/income.controller");
    const _housing = require("../controllers/housing.controller");
    const _discr_expense = require("../controllers/discr_expense.controller")


    //User CRUD Group
    // Test Method to Grab all Users
    app.get("/allUsers", user.getAll);

    //Add New User
    app.post("/newUser", user.create);

    app.post("/login", user.login);

    app.post("/updateEmail", user.updateEmail);

    app.post("/updatePassword", user.updatePassword);

    app.post("/deleteUser", user.remove);

    app.post("/updateName", user.updateName);

    //End User CRUD Group

    
    //Begin Debt CRUD Group

    //Posts new Debt object to the database.
    app.post("/newDebt", debt.create);

    //Get's all of a User's Debts.
    app.post("/getUserDebts", debt.getUserDebts);

    //Updates a Debt object in the database.
    app.post("/updateDebts", debt.updateDebt);

    ///Deletes a single debt object.
    app.post("/deleteDebt", debt.remove);

    //Deletes ALL debt objects for any user.
    app.delete("/deleteUserDebts", debt.removeAll);


    //End Debt CRUD Group



    //Begin Expenses CRUD Group

    //Posts new Expense object to the database.
    app.post("/newExpense", _expenses.create); //GTG

    //Get's all of a User's Expenses.
    app.post("/getUserExpenses", _expenses.getUserExpense); //GTG

    //Updates an Expense object in the database.
    app.post("/updateExpense", _expenses.updateExpense); //GTG

    ///Deletes a single Expense object.
    app.post("/deleteExpense", _expenses.remove); //GTG

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
    app.post("/getUserInvestmentSum", _invest.getUserInvestmentSum);

    //Deletes a single user investment.
    app.post("/deleteInvestment", _invest.remove);

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
    app.post("/getUserHousing", _housing.getUserHousing);

    //Deletes a single Housing entry.-Works 4/3
    app.post("/deleteHousing", _housing.remove);

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

     //Begin Housing CRUD Group- ALL working 4/3

    //Add New Housing entry.- Works 4/3
    app.post("/newHousing", _housing.create);

    //Get all Housing entries. - Works 4/3
    app.get("/getAllHousing", _housing.getAll);

    //Updates an individual Hosuing entry.- Works 4/3
    app.post("/updateHousing", _housing.updateHousing);

    //Finds an individual Hosuing entry.- Works 4/3
    //app.post("/findByUserId", _housing.findByUserId);

    //Deletes a single Housing entry.-Works 4/3
    //app.delete("/deleteHousing", _housing.remove);

    //Deletes all Housing entries for a specific user.-Works 4/3
    app.delete("/deleteUserHousing", _housing.removeAll);

    //End Housing CRUD Group 


    //Begin Income CRUD Group 

    //Get all Housing entries. - Works 4/3
    app.get("/getAllIncome", _income.getAll);

    //Posts new Income object to the database. - works 4/6
    app.post("/newIncome", _income.create);

      //get sum of all user investments
      //app.post("/getUserIncomeSum", _invest.getUserIncomeSum);

      //node servapp.post("/getUserInvestments", _income);

    //Deletes a single Income object.- works 4/6
    app.post("/deleteIncome", _income.remove);

    //Deletes ALL Income objects for a user.- works 4/6
    app.delete("/deleteUserIncome", _income.removeAll);

    //Get's all of a User's Income entries - working 4/6
    app.post("/getUserIncome", _income.getUserIncome);
    
    //Updates an Income object in the database.-working 4/6
    app.post("/updateIncome", _income.updateIncome);
    app.get("/getUserIncomeSum", _income.getUserIncomeSum);
    
    app.get("/allIncome", _income.getAll);

    //Begin Email Contact Form
    app.post("/emailTeam", _email.sendEmail);
    
};
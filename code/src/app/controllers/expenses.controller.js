const Expenses = require('../models/expenses.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    const expense = new Expenses({
        name: req.body.name,
        costs: req.body.costs,
        userId: req.body.userId
      });

    Expenses.create(expense ,(err, data) => {
        res.send(data);
        });
    };

//Grab all Investments for a certain User based on their ID.
exports.getUserExpense = (req, res) => {
    const expense = new Expenses({
        userId: req.body.userId
    });

    Expenses.getUserExpense(expense, (err, data) => {
        res.send(data);
    });
};

//Update specific Expense 
exports.updateExpense = (req, res) => {
    const expense = new Expenses({
        name: req.body.name,
        costs: req.body.costs,
        expenseId: req.body.expenseId
    });

    Expenses.findbyExpenseId(expense, (err, data) => {
        Expenses.updateExpense(expense, (err, data) => {
            res.send(data);
        });
    })

};

exports.remove = (req, res) => {
    const expense = new Expenses({
        expenseId: req.body.expenseId
      });

      Expenses.remove(expense, (err, data) => {
          res.send.data;
      });
      res.send("Deleted Debt ID: " + expense.expenseId)
}

exports.removeAll = (req, res) => {
    const expense = new Expenses({
        userId: req.body.userId
    });

    Expenses.removeAll(expense, (err, data) => {
        res.send.data;
    })
    res.send("Deleted All Expenses For: " + expense.userId);
};
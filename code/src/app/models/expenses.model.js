const sql = require("./db.js");

const Expense = function(_expenses) {
  this.expenseId = _expenses.expenseId;
  this.name = _expenses.name;
  this.costs = _expenses.costs;
  this.userId = _expenses.userId;
};

Expense.create = (_expenses, result) => {
  sql.query("INSERT INTO Expenses(NAME, COSTS, USERID) VALUES(?, ?, ?);",[_expenses.name, _expenses.costs, _expenses.userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Expense: ", {..._expenses });
    result(null, {..._expenses });
  });
};

Expense.getUserExpense = (_expenses, result) => {
    sql.query("SELECT * FROM Expenses WHERE USERID = ?;",[_expenses.userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("User Debt: ", {...res });
      result(null, {...res });
    });
  };


Expense.updateExpense = (_expenses, result) => {
  sql.query(
    "UPDATE Expenses SET NAME = ?, COSTS = ?  WHERE EXPENSEID = ?", [_expenses.name, _expenses.costs, _expenses.expenseId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated User Debt: " + _expenses.userId);
      result(null, {..._expenses });
    }
  );
};

Expense.findbyExpenseId = (_expenses, result) => {
  sql.query("SELECT * FROM Expenses WHERE EXPENSEID = ?" , [_expenses.expenseId], (err, res) => {
    if (err) {
      console.log("Sql Error!");
      result(null, err);
      return;
    } if (res.length == 0) {
      console.log("No Expense found by the ID: " + _expenses.expenseId);
      result(err);
      return;
    }
    console.log("Expense ID found for: " + _expenses.expenseId)
    result(null, res);
  })
}

Expense.remove = (_expenses, result) => {
    sql.query("DELETE FROM Expenses WHERE EXPENSEID = ?", [_expenses.expenseId], (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "Investment Data Not Found." }, null);
        return;
      }

      console.log("Deleted Investment ID: ", _expenses.expenseId);
      result(null, res);
    });
  };

Expense.removeAll = (_expenses, result) => {
    sql.query("DELETE FROM Expenses WHERE USERID = ?", [_expenses.userId], (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRow == 0) {
            result("Not Found:" + null);
            return;
        }

        console.log("Deleted Investments: ", _expenses.userId);
        result(null, res);
    })
}


module.exports = Expense;
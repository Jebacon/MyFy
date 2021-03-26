const sql = require("./db.js");

const Debt = function(debt) {
  this.debtName = debt.debtName;
  this.balance = debt.balance;
  this.rate = debt.rate;
  this.payTime = debt.payTime;
  this.userId = debt.userId;
  this.debtId = debt.debtId;
};

Debt.create = (debt, result) => {
  sql.query("INSERT INTO debt(DEBT_NAME, BALANCE, RATE, PAYTIME, USERID) VALUES(?, ?, ?, ?, ?);",[debt.debtName, debt.balance, debt.rate, debt.payTime, debt.userId], (err, res) => {
    console.log(debt.payTime);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Debt Created: ", {...debt });
    result(null, {...debt });
  });
};

Debt.getUserDebts = (debt, result) => {
    sql.query("SELECT * FROM debt WHERE USERID = ?;",[debt.userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("User Debts: ", {...res });
      result(null, {...res });
    });
  };


Debt.updateDebt = (debt, result) => {
  sql.query(
    "UPDATE debt SET DEBT_NAME = ?, BALANCE = ?, RATE = ?, PAYTIME = ?  WHERE DEBTID = ?", [debt.debtName, debt.balance, debt.rate, debt.payTime, debt.debtId],
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

      console.log("updated User: " + debt.debtId);
      result(null, {...debt.debtId });
    }
  );
};

Debt.findbyDebtId = (debt, result) => {
  sql.query("SELECT * FROM debt WHERE DEBTID = ?" , [debt.debtId], (err, res) => {
    if (err) {
      console.log("Sql Error!");
      result(null, err);
      return;
    } if (res.length == 0) {
      console.log("No Debt found by the ID: " + debt.debtId);
      result(err);
      return;
    }
    console.log("Debt ID found for:" + debt.debtId)
    result(null, res);
  })
}

Debt.remove = (debt, result) => {
    sql.query("DELETE FROM debt WHERE DEBTID = ?", [debt.debtId], (err, res) => {
        console.log(debt.debtId);
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "Debt Data Not Found." }, null);
        return;
      }

      console.log("Deleted Debt ID: ", debt.debtId);
      result(null, res);
    });
  };

Debt.removeAll = (debt, result) => {
    sql.query("DELETE FROM debt WHERE USERID = ?", [debt.userId], (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRow == 0) {
            result("Not Found:" + null);
            return;
        }

        console.log("Deleted Debt for: ", debt.userId);
        result(null, res);
    })
}


module.exports = Debt;
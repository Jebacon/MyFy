const sql = require("./db.js");

const Invest = function(invest) {
  this.investName = invest.investName;
  this.investAmount = invest.investAmount;
  this.srcAccount = invest.srcAccount;
  this.destAccount = invest.destAccount;
  this.userId = invest.userId;
  this.investId = invest.investId;
  this.newInvestname = invest.newInvestname;
  this.newInvestAmount = invest.newInvestAmount;
  this.newSrcAccount = invest.newSrcAccount;
  this.newDestAccount = invest.newDestAccount;
};

Invest.create = (invest, result) => {
  sql.query("INSERT INTO Invest_Save(INVESTNAME, INVEST_AMNT$, SRC_ACCT, DEST_ACCT, USERID) VALUES(?, ?, ?, ?, ?);",[invest.investName, invest.investAmount, invest.srcAccount, invest.destAccount, invest.userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created investment: ", {...invest });
    result(null, {...invest });
  });
};

Invest.getUserInvestments = (invest, result) => {
    sql.query("SELECT * FROM Invest_Save WHERE USERID = ?;",[invest.userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("User Investments: ", {...res });
      result(null, {...res });
    });
  };
  Invest.getUserInvestmentSum = (invest, result) => {
    sql.query("SELECT SUM(AMOUNT) FROM UserData.Income WHERE USERID = ?;", [invest.userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, err);
        return;
      }
      console.log("User Sum: "+  JSON.stringify(res));
      result(JSON.stringify(res), res);
    })
  }

Invest.findbyInvestId = (invest, result) => {
  sql.query("SELECT * FROM Invest_Save WHERE INVESTID = ?" , [invest.investId], (err, res) => {
    if (err) {
      console.log("Sql Error!");
      result(null, err);
      return;
    } if (res.length == 0) {
      console.log("No Investment found by the ID: " + invest.investId);
      result(err);
      return;
    }
    console.log("Invest ID found for:" + invest.investId)
    result(null, res);
  })
}

Invest.updateInvestments = (invest, result) => {
  sql.query(
    "UPDATE Invest_Save SET INVESTNAME = ?, INVEST_AMNT$ = ?, SRC_ACCT = ?, DEST_ACCT = ? WHERE INVESTID = ?", [invest.investName, invest.investAmount, invest.srcAccount, invest.destAccount, invest.investId],
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

      console.log("Updated Investment: " + invest.investId);
      result(null, {...invest.investId });
    }
  );
};

Invest.remove = (invest, result) => {
    sql.query("DELETE FROM Invest_Save WHERE INVESTID = ?", [invest.investId], (err, res) => {
        console.log(invest.investId);
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "Investment Data Not Found." }, null);
        return;
      }

      console.log("Deleted Investment ID: ", invest.investId);
      result(null, res);
    });
  };

Invest.removeAll = (invest, result) => {
    sql.query("DELETE FROM Invest_Save WHERE USERID = ?", [invest.userId], (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRow == 0) {
            result("Not Found:" + null);
            return;
        }

        console.log("Deleted Investments: ", invest.userId);
        result(null, res);
    })
}


module.exports = Invest;
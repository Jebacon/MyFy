// Josiah Stadler 3/16
const sql = require("./db.js");

const Invest_Save = function(_invest_save) {
  this.INVESTID = _invest_save.INVESTID;
  this.INVESTNAME = _invest_save.INVESTNAME;
  this.INVEST_AMNT$ = _invest_save.INVEST_AMNT$;
  this.FREQUENCY = _invest_save.FREQUENCY;
  this.SRC_ACCT = _invest_save.SRC_ACCT;
  this.DEST_ACCT = _invest_save.DEST_ACCT;
  this.USERID = _expense.USERID;
};

Invest_Save.create = (_invest_save, result) => {
  sql.query("INSERT INTO Invest_Save(INVESTNAME, INVEST_AMNT$, SRC_ACCT, DEST_ACCT, USERID, FREQUENCY) VALUES(?, ?, ?, ?, ?, ?);",[_invest_save.INVESTNAME, _invest_save.INVEST_AMNT$, _invest_save.SRC_ACCT, _invest_save.DEST_ACCT, _invest_save.USERID, _invest_save.FREQUENCY], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Investment and saving entry created: ", {..._invest_save });
    result(null, {..._invest_save});
  });
};



Invest_Save.getAll = result => {
  sql.query("SELECT * FROM Invest_Save", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("All Investment and savings data: ", res);
    result(null, res);
  });
};

Invest_Save.updateById = (INVESTID, USERID, result) => {
  sql.query(
    "UPDATE Invest_Save SET INVESTNAME = ?, INVEST_AMNT$ = ?,SRC_ACCT = ?, DEST_ACCT = ? WHERE INVESTID = ? and USERID = ?",
    [_invest_save.INVESTNAME, _invest_save.INVEST_AMNT$, _invest_save.SRC_ACCT, _invest_save.DEST_ACCT, INVESTID, USERID],
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

      console.log("updated investment/saving entry with ID: ", { INVESTID: INVESTID, ..._invest_save});
      result(null, { INCOMEID: INVESTID, ..._invest_save });
    }
  );
};

Invest_Save.remove = (INVESTID, result) => {
  sql.query("DELETE FROM Invest_Save WHERE INVESTID = ?", INVESTID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted investment/saving entry with ID: ", INVESTID);
    result(null, res);
  });
};

Invest_Save.removeAll = result => {
  sql.query("DELETE FROM Invest_save", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Investment/savings entries`);
    result(null, res);
  });
};


module.exports = Invest_Save;
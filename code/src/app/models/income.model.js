// Josiah Stadler 3/16
const sql = require("./db.js");

const Income = function(_income) {
  this.INCOMEID = _income.INCOMEID;
  this.SRCNAME =_income.SRCNAME;
  this.AMOUNT = _income.AMOUNT;
  this.PAYCYCLE = _income.PAYCYCLE;
  this.USERID = _income.USERID;
  this.new_SRCNAME =_income.new_SRCNAME;
  this.new_AMOUNT = _income.new_AMOUNT;
  this.new_PAYCYCLE = _income.new_PAYCYCLE; 
};

Income.create = (_income, result) => {
  sql.query("INSERT INTO Income(SRCNAME, AMOUNT, PAYCYCLE, USERID) VALUES(?, ?, ?, ?);",[_income.SRCNAME, _income.AMOUNT, _income.PAYCYCLE, _income.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Income entry created: ", {..._income });
    result(null, {..._income });
  });
};



Income.getAll = result => {
  sql.query("SELECT * FROM Income", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("All Income data: ", res);
    result(null, res);
  });
};
Income.findByIncomeId = (_income, result) => {
  sql.query(`SELECT SRCNAME FROM Income WHERE INCOMEID = ? and USERID = ?`,[_income.INCOMEID, _income.USERID], (err, res) => {
    if (err) {
      //console.log(err);
      result(err, null);
      return;// next(err);
    }else {
      //console.log(res);
      result(null, res);
      return;
    }
  });
};
Income.updateIncome = (_income, result) => {
  sql.query(
    "UPDATE Income SET SRCNAME = ?, AMOUNT = ?, PAYCYCLE = ? WHERE INCOMEID = ? and USERID = ?",
    [_income.new_SRCNAME, _income.new_AMOUNT,_income.new_PAYCYCLE,_income.INCOMEID, _income.USERID],
    (err, res) => {
      if (err) {
       // console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.affectedRows == 0) {
        // not found income with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated income entry with ID: " + _income.INCOMEID);
      result(null, {..._income.INCOMEID });
    }
  );
};

Income.remove = (_income, result) => {
  sql.query("DELETE FROM Income WHERE SRCNAME = ? and USERID = ?", [_income.SRCNAME, _income.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Income with the id
      result({ kind: "not_found" }, null);
      return;
    }else{
      console.log("deleted income with ID: " + _income.INCOMEID);
      result(null, {..._income.INCOMEID });

    }

   
  });
};

Income.removeAll = result => {
  sql.query("DELETE FROM Income", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Income entries`);
    result(null, res);
  });
};


module.exports = Income;
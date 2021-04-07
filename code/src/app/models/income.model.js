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
  this.userIncomeT = 0;
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
Income.getUserIncome = (_income, result) => {
  sql.query("SELECT * FROM Income WHERE USERID = ?",[_income.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("User Income Entries: ", {...res });
    //result(null, {...res });
    console.log("User Income Entries: ", {...res });
    res.forEach(AMOUNT => this._income.userIncomeT += this._income.AMOUNT);   
    console.log("Total Income for this user: Should show here",_income.userIncomeT );
    result(null, {...res });
  });
};

Income.getAllUserIncome = (_income, result) => {
  sql.query("SELECT * FROM Income WHERE USERID = ?",[_income.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User Income Entries: ", {...res });
    //res.forEach(AMOUNT => _income.userIncomeT += AMOUNT.value);   
    console.log("Total Income for this user: Should show here",{...res} );
    result(null, {...res });
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
     
      result(err, null);
      return;
    }else {
     
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
       
        result(err, null);
        return;
      }
      
      if (res.affectedRows == 0) {        
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated income entry with ID: " + _income.INCOMEID);
      result(null, {..._income.INCOMEID });
    }
  );
};

Income.remove = (_income, result) => {
  sql.query("DELETE FROM Income WHERE SRCNAME = ? AND USERID = ?", [_income.SRCNAME,_income.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }else{
      console.log("deleted income entry with name: " + _income.SRCNAME);
      result(null, _income.SRCNAME);

    }   
  });
};

Income.removeAll = (_income, result) => {
  sql.query("DELETE FROM Income WHERE USERID = ?", [_income.USERID], (err, res) =>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRow == 0) {
          result("Not Found:" + null);
          return;
      }

      console.log("Deleted Income entries for user with ID for: ", _income.USERID);
      result(null, res);
  })
}



module.exports = Income;
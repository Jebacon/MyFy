const { pseudoRandomBytes } = require('crypto');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    var config = {
        user: 'Admin',
        password: 'FinalSemester',
        server: 'userdb.cofrpp4irl9r.us-east-1.rds.amazonaws.com', 
        database: 'UserData' 
    };

    var user = '\'example\'';
    var password = '\'examplePassword\'';
    var query = 'SELECT USERNAME, PASSWORD FROM Users WHERE USERNAME = \'example1\' AND PASSWORD = \'examplePassword\'';
    var querytest = 'SELECT USERNAME, PASSWORD FROM Users WHERE USERNAME = @user AND PASSWORD = @password';
    var testQuery = 'SELECT * FROM USERS';

    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        var request = new sql.Request();

        request.query(query, function (err, results) {
            
            if (err) console.log(err)
            if (results.recordset.length < 1) {
                res.send('No matching username/password combination.');
            } else {
            res.send(results.recordset);
            console.log(results.recordset)
            }
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server listening on 5000...');
});
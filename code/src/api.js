var Db  = require('./app/dbOperations');
var User = require('./app/accountsetup/user');
const dboperations = require('./app/dbOperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

app.get('/login', function (request, response) {
    dboperations.login().then(result => {
        response.send(result);
    })
})

app.post('/addUser', function (request, response) {

    let user = {...request.body}

    dboperations.addUser(user).then(result => {
        console.log(result);
        response.send(json(result));
    })
})




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
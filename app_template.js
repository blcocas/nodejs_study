/*-------------------------------------------------------------
SETTING
--------------------------------------------------------------*/
const express = require('express');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const users = require('./routes/users.js');
app.use('/users',users);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?

app.use(morgan('dev'));

app.locals.pretty = true; //html소스 이쁘게
/*--------------------------------------
MYSQL
--------------------------------------*/
const mysql = require('mysql');
const conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ghdwo966',
  database : 'db_name'
});
conn.connect(function(err){
  if (err) throw err;
  console.log('mysql connect ok!')
});
/*-------------------------------------------------------------
ROUTER
--------------------------------------------------------------*/
app.get('/',function(req,res){
  res.send('hello');
})
/*-------------------------------------------------------------
FUNCTION
--------------------------------------------------------------*/
/*-------------------------------------------------------------
SERVER
--------------------------------------------------------------*/
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})

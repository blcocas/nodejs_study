/*-------------------------------------------------------------
SETTING
--------------------------------------------------------------*/
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?


app.locals.pretty = true; //html소스 이쁘게

/*-------------------------------------------------------------
ROUTER
--------------------------------------------------------------*/
app.get('/count',function(req,res){
  if(req.cookies.count){
    var count = parseInt(req.cookies.count);
    count++;
  }
  else {
    var count = 0;
  }
  res.cookie('count',count);
  res.send('count : '+count);
})

/*-------------------------------------------------------------
SERVER
--------------------------------------------------------------*/
app.listen(3000, function(){
  console.log('Connected to 6000 port!');
})

/*-------------------------------------------------------------
SETTING
--------------------------------------------------------------*/
const express = require('express');
const app = express();

const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?

/*-------------------------------------------------------------
ROUTER
--------------------------------------------------------------*/
app.get('/count',function(req,res){
  if(req.session.count){
    var count = req.session.count++;
  }
  else
    req.session.count = 1;

  res.send('count : '+ req.session.count);
});
/*-------------------------------------------------------------
FUNCTION
--------------------------------------------------------------*/
/*-------------------------------------------------------------
SERVER
--------------------------------------------------------------*/
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})

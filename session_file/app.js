/*-------------------------------------------------------------
SETTING
--------------------------------------------------------------*/
const express = require('express');
const app = express();

const session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store : new FileStore({path : './sessions/'})
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?
app.locals.pretty = true; //html소스 이쁘게
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


app.get('/auth/login',function(req,res){
  res.render('login');
})

app.post('/auth/login',function(req,res){
  var sess = req.session;
  var user = {
    id:'hongss94',
    pass:'0',
    displayName:'Hong'
  }
  var id = req.body.id;
  var pass = req.body.pass;
  if(id === user.id && pass === user.pass){
    sess.displayName = user.displayName;
    req.session.save(function(){ //세션 작업이 끝났을때 콜백함수를 부름
      res.redirect('/welcome');
    });
  }
  else {
    res.redirect('/auth/login');
  }
})

app.get('/welcome',function(req,res){
  res.render('welcome',{session : req.session});
})

app.get('/auth/logout',function(req,res){
  delete req.session.displayName
  req.session.save(function(){ //세션 작업이 끝났을때 콜백함수를 부름
    res.render('logout');
  });

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

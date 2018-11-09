var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mysql = require('mysql');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ghdwo966',
  database : 'jwt_example'
});
conn.connect(function(err){
  if (err) throw err;
});
app.set('fucker', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
/*---------------------------------------------------------------
API routes
---------------------------------------------------------------*/
var router = express.Router();

router.post('/auth',function(req,res){
  let sql = 'select * from user where name = ?'
  conn.query(sql,[req.body.name],function(err,rows,fields){
    let user = rows[0];

    if(err) throw err;
    if(!user) {
      res.json({success : false, message : "auth faild, 유저없음"})
    }
    else if(user){
      if(rows[0].password != req.body.password){
        res.json({success : false, msesage :"auth faild, 비밀번호 틀림" })
      }
      else{
        const payload= {
          admin : user.admin,
        }
        let token = jwt.sign(payload, app.get('fucker'),{
//        expiresIn: 1000
        });

        res.json({
          success : true,
          message : 'Enjoy your token!',
          token: token
        });
      }
    }
  })
})


router.use(function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, app.get('fucker'),function(err,decoded){
    if(err)
      return res.json({success : false, message:'토큰 검증 오류'});
    req.decoded = decoded;
    next();
  });
  }
  else{
    return res.status(403).send({
      success : false,
      message : 'No token provided'
    });
  }
})

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


router.get('/users', function(req, res) {
  let sql = 'select * from user'
  conn.query(sql,function(err,rows,fields){
    if(err) throw err;
    res.json({rows});
  })
});

router.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', router);



/*---------------------------------------------------------------
router
---------------------------------------------------------------*/
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
app.get('/setup',function(req,res){
  let sql = 'insert into user (name,password,admin) values(?,?,?)'
  var hong = {
    name : 'hong',
    password : 'ghdwo966',
    admin : 1
  }
  conn.query(sql,[hong.name,hong.password,hong.admin],function(err,rows,fields){
    if(err) throw err;
    console.log('user saved successfully!');
    res.json({success : true});
  })
});




app.listen(port);
console.log('Magic happens at http://localhost:' + port);

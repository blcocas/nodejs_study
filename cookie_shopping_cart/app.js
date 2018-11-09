/*-------------------------------------------------------------
SETTING
--------------------------------------------------------------*/
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser()); // 쿠키보안을 위한 key

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?


app.locals.pretty = true; //html소스 이쁘게

var products = {
  1 : {title : 'nodejs'},
  2 : {title : 'web'},
  3 : {title : 'hello'}
}

/*-------------------------------------------------------------
ROUTER
--------------------------------------------------------------*/
app.get('/products', function(req,res){
  var list = '';
  for(val in products){
    list +=`<li>
    <a href='/cart/${val}'>${products[val].title}</a>
    </li>`
  }
  res.send(`
    <h1>Products</h1>
    <ol>${list}</ol>
    <a href='/cart'>cart<a>`);
})

app.get('/cart/:id',function(req,res){
  var id = req.params.id;
  if(req.cookies.cart){
    var cart = req.cookies.cart;
  }
  else {
    var cart = {};
  }
  if(!cart[id]) cart[id] = 0;
  cart[id]++;
  res.cookie('cart',cart);
  res.redirect('/products');
})

/*
  cart = {
  1 : 1,
  2 : 2,
}
*/
app.get('/cart',function(req,res){
  if(req.cookies.cart){
    var cart = req.cookies.cart;
  }
  else{
    res.send(`
      <h1>Cart</h1>
      <h3>No item</h3>
      <a href='/products'>products<a>
      `);
  }
  var list = '';
  for(val in products){
    if(cart[val]){
      list +=`<li>
      ${products[val].title} (${cart[val]})
      </li>`
    }
  }
  res.send(`
    <h1>Cart</h1>
    <ol>${list}</ol>
    <a href='/products'>products<a>`);
})

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

const promise = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve("success!");
    setTimeout(function(){
      resolve("success2!");
    })
  },1000);
})
promise.then(function(what){
  console.log('wow'+ what);
})

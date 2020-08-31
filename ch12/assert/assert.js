var assert = require('assert')
var a = 2


try{
  assert.equal(a, 2,'a is equal to 1')
}catch(err){
  console.log('assersion')
  console.log(err)
  console.log(err.stack)
}

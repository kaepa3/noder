var should = require('should')
var a = 1

try {
  a.should.equal(2)
} catch (err) {
  console.log('Assersion Error')
  console.log(err)
}

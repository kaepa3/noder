var events = require('events')
var util = require('util')

function SyncCB(cb){
  if(cb){
    console.log('1')
    process.nextTick(function(){
      cb()
    })
  }
}

util.inherits(SyncCB, events.EventEmitter)
console.log('2')
SyncCB.prototype.setbaz = function(arg){
  this.baz = arg
}

console.log('3')
var foo = new SyncCB(function(){
  foo.setbaz('bar')
  console.log(foo.baz)
})

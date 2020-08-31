var domain = require('domain')
var events = require('events')
var ee;

var d1 = domain.create()
var d2 = domain.create()

d1.on('error', function(e){
  console.log('d1:', e.message)
})

d2.on('error', function(e){
  console.log('d2:', e.message)
})

d1.run(function(){
  ee = new events.EventEmitter()
})

d2.run(function(){
  ee.emit('error', new Error('d2err'))
})

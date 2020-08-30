var domain = require('domain')
var events = require('events')

var d = domain.create()
d.on('error', function(e){
  console.error('d:', e.message)
})

d.run(function(){
  var ee = new events.EventEmitter()
  ee.emit('error', new Error('emmited error'))
})

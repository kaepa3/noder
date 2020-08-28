
var events = require('events')
var emitter = new events.EventEmitter()

var sampleListener = function(arg1){
  console.log(arg1)
}
emitter.on('occurrence', sampleListener)

emitter.emit('occurrence', 'occured!')

var domain = require('domain')

var d = domain.create()

d.on('error', function(e){
  console.error('d', e.message)
})
d.run(function(){
  throw new Error('thorowed error')
})

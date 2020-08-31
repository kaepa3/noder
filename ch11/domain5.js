var domain = require('domain')
var fs = require('fs')
var d = domain.create()

d.on('error', function(e){
  console.log('d:', e.message)
})

d.run(function(){
  process.nextTick(function(){
    setTimeout(function(){
      fs.readFile('non', 'utf8',function(err, data){
        if(err) throw err
      })
    },100)
  })
})

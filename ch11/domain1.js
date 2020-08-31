var fs = require('fs')
process.on('uncaughtException', function(e){
  console.error('uncaught:', e.message)
})

try{
  fs.readFile('non-exist.txt', 'utf-8', function(err, data){
    if(err) throw err

    console.log('data:', data)
  })
} catch(e){
  console.error('catch:', e.message)
}

var fs = require('fs')

var rs = fs.createReadStream('target.txt', {encoding: 'utf-8', highWaterMark: 1})

rs.on('data', function(chunk){
  console.log(chunk)
})

rs.on('end', function(){
  console.log('<EOF>')
})

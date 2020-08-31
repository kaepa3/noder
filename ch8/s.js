var path = require('path'), fs = require('fs')

var filePath = path.join(__dirname, 'test.txt')

var readStream = fs.createReadStream(filePath)
readStream.setEncoding('utf8')

readStream.on('data', function(data) {
  console.log(data)
})

readStream.on('end', function() {
  console.log('end')
})

readStream.on('error', function(err){
  console.log('error ocurred')
  console.log(err)
})

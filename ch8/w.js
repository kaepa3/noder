var path = require('path'), fs = require('fs')

var filePath = path.join(__dirname, 'write.txt')
var writeStream = fs.createWriteStream(filePath)

writeStream.write('hello world')
writeStream.end()

writeStream.on('error', function(err) {
  console.log('error')
  console.log(err)
})
writeStream.on('close', function() {
  console.log('closed')
})


var path = require('path'), fs = require('fs')

var outputFilePath = path.join(__dirname, 'write.txt')
var writeStream = fs.createWriteStream(outputFilePath)

var inputFilepath = path.join(__dirname, 'test.txt')
var readStream = fs.createReadStream(inputFilepath)


writeStream.on('error', function(err) {
  console.log('error')
  console.log(err)
})

writeStream.on('close', function() {
  console.log('closed')
})

writeStream.on('drain', function() {
  console.log('drain')
  readStream.resume()
})

readStream.on('data', function(data) {
  console.log('data')
  if (writeStream.write(data) === false) {
    console.log('pause')
    readStream.pause()
  }
})

readStream.on('end', function() {
  console.log('end')
})

readStream.on('error', function(err) {
  console.log('err')
  console.log(err)
})

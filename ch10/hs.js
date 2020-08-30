var http = require('http')
var options = {
  host: 'localhost',
  port: 3000,
  path: '/',
  method: 'post',};

var req = http.request(options, function(res) {
  var data = ''
  res.on('data', function(chunk) {
    data += chunk
  })
  res.on('end', function(){
    console.log(data)
  })
})

var msg = 'hello'

req.setHeader('Content-Length', Buffer.byteLength(msg))
req.write(msg)
req.end()


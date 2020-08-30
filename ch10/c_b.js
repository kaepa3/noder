var http = require('http')
options = {
  host: 'localhost',
  port: 1337,
  auth: 'alice:alicepass'
}

var req = http.request(options, function(res) {
  var data = ''
  res.on('data', function(chunk) {
    data += chunk
  })
  res.on('end', function() {
    console.log('==================Responce data===============')
    console.log(data)
  })
})
req.end()
req.on('socket', function(socket) {
  console.log('==================Socket data===============')
  socket.on('data', function(chunk) {
    console.log(chunk.toString())
  })
})

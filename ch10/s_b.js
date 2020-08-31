var http = require('http')
var host = 'localhost'
var port = 1337

var htpasswd = { 'alice': 'alicepass' }
var server = http.createServer(function(req, res) {
  function showAuthContent(res, username, password) {
    if (username in htpasswd) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Hello Authed world\n')
    } else {
      res.writeHead(403, { 'Content-Type': 'text/plain' })
      res.end('Forbidden\n')
    }
  }

  if (req.headers.authorization) {
    var header = req.headers.authorization.split(' ')
    if (header[0] === "Basic" && header[1]) {
      var data = (new Buffer(header[1], 'base64').toString()).split(':')
      showAuthContent(res, data[0], data[1])
    } else {
      res.writeHead(403, { 'Content-Type': 'text/plaint' })
      res.end('Forbidden\n')
    }
  } else {
    res.writeHead(401, { 'Content-Type': 'text/plain' }, 'WWW-Authenticate',
      'Basic realm="Username"')
    res.end('Authorization required')
  }
})

server.listen(port, function(){
  console.log('listening on', host + ':' + port)
})

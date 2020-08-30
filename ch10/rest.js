var http = require('http')
var port = 3000
var obj = {}

var server = http.createServer(function(res, req) {
  var remoteAddress = req.remoteAddress
  var header = { 'Connection': 'close', 'Content-Length': 0 }
  var key = req.url
  switch (req.method) {
    case 'POST':
      if (obj[key]) {
        res.writeHead(403, header)
        res.end()
      } else {
        var data = ''
        req.on('data', function(chunk) {
          data += chunk
        })

        req.on('end', function() {
          try {
            obj[key] = JSON.parse(data)
            res.writeHead(200, header)
            console.log('POST', key, obj[key], 'from ' + remoteAddress)
          } catch (e) {
            res.writeHead(400, e.message, header)
          }
          res.end()
        })
      }
      break
    case 'GET':
      if (obj[key]) {
        var json = JSON.stringify(obj[key])
        res.writeHead(200, {
          'Content-Length': Buffer.byteLength(json),
          'Content-Type': 'application/json',
          'Connection': 'close'
        })
        res.write(json)
        console.log('GET', key, 'from' + remoteAddress)
      } else {
        res.writeHead(404, header)
        console.log('POST', key, obj[key], 'from ' + remoteAddress)
      }
      res.end()
      break
    case 'PUT':
      if (obj[key]) {
        var data = ''
        req.on('data', function(chunk) {
          data += chunk
        })
        req.on('end', function() {
          try {
            obj[key] = JSON.parse(data)
            res.writeHead(200, header)
            console.log('PUT', key, obj[key], ' from' + remoteAddress)
          } catch (e) {
            res.writeHead(400, e.message, header)
          }
          res.end()
        })
      } else {
        res.writeHead(403, header)
        res.end()
      }
      break

    case 'DELETE':
      if (obj[key]) {
        delete obj[key]
        var data = ''
        res.writeHead(200, header)
        console.log('DELTE', key, 'from' + remoteAddress)
      } else {
        res.writeHead(404, header)
      }
      res.end()
      break
  }
})

server.on('error', function(e) {
  console.log('server error', e.message)
})


server.on('clientError', function(e) {
  console.log('server error', e.message)
})

server.listen(port, function() {
  console.log('listening on' + port)
})



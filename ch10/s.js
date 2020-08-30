var http = require('http')
var server = http.createServer()
var port= 3000


server.on('request', function(req, res){
  var data = ''
  req.on('data', function(chunk){
    data += chunk}
  )
  req.on('end', function(){
    res.writeHead(200, {'Content-Type':'text/plain'})
    res.end('Body echo:' + data + '\n')
  })
})

server.on('request', function(req, res){
  console.log('=======start============')
  server.on('end', function(){
    console.log('end')
  })
})


server.on('clienterror', function(e){
  console.log('server error:', e.message)
})

server.listen(port, function(){
  console.log('losten:' + port)
})

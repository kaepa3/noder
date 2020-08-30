var domain = require('domain')
var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname
  var reqd = domain.create()
  reqd.add(req)
  reqd.on('error', function(e) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('File no found')
  })
  if (/\.html$/.test(pathname)){
    var filename = __dirname + '/public' + pathname
    fs.readFile(filename, 'utf8', reqd.intercept(function(data){
      res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': Buffer.byteLength(data)})
    }))
    res.end(data)
  }else {
    req.emit('error', new Error('not found'))
  }
}).listen(8080, function(){
  console.log('listen on 8080')
})

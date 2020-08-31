var http = require('http')
var servers = {}
var server_num = 3
var host = 'localhost'
var port_start = 10001


function createServer(servers, port){
  var name = host+':'+port
  servers[name] = http.createServer(function(req, res){
    var max_res_delay = 10
    var delay = Math.floor(max_res_delay * Math.random())
    setTimeout(function(){
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end('Delayed' + delay + '[sec]')
    }, delay * 1000)
  })
  servers[name].listen(port, function(){
    console.log('listen:', name)
  })
}

for(var i=0; i<server_num; i++){
  createServer(servers, port_start++)
}

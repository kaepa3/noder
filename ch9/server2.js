var net = require('net')
var readline = require('readline')

var server = net.createServer()


server.maxConnections = 3

function Client(socket) {
  this.counter = 0
  this.socket = socket
  this.t_queue = {}
}

Client.prototype.writeData = function(d, id) {
  var socket = this.socket
  if (socket.writable) {
    var key = socket.remoteAddress + ':' + socket.remotePort
    process.stdout.write('[' + key + ']-' + d)
    socket.write('[R]' + d, function() {
      delete t_queue
    })
  }
}
var clients = {}

server.on('connection', function(socket) {
  console.log('gogogo')
  var status = server.getConnections + '/' + server.maxConnections
  var key = socket.remoteAddress + ':' + socket.remotePort
  console.log('connect:' + status + ' ' + key)
  clients[key] = new Client(socket)
})

server.on('connection', function(socket) {
  var data = ''
  var newline = /\r\n|\n/

  socket.on('data', function(chunk) {
    function writeDataDeleyed(key, d) {
      var client = clients[key]
      var tmout = setTimeout(function() {
        client.writeData(d, client.counter)
      }, Math.random() * 10 * 1000)
      client.t_queue[client.counter++] = tmout
    }
    data += chunk.toString()
    var key = socket.remoteAddress + ':' + socket.remotePort
    if (newline.test(data)) {
      writeDataDeleyed(key, data)
      data = ''
    }
  })
})

server.on('connection', function(socket) {
  var key = socket.remoteAddress + ':' + socket.remotePort
  socket.on('end', function() {
    var status = server.getConnections + '/' + server.maxConnections

    console.log('connect end:' + status + ' ' + key)
    delete clients[key]
  })
})

server.on('close', function() {
  console.log('server close')
})

server.listen(1111, '127.0.0.1', function() {
  var addr = server.address()
  console.log('listen:' + addr.address + ':' + addr.port)
})

var rl = readline.createInterface(process.stdin, process.stdout)
rl.on('SIGINT', function() {
  for (var i in clients) {
    var socket = clients[i].socket
    var t_queue = clients[i].t_queue
    socket.end()
    for (var id in t_queue) {
      clearTimeout(t_queue[id])
    }
  }
  server.close()
  rl.close()
})



var net = require('net')
var readline = require('readline')

var server = net.createServer()
server.maxConnections = 3

function Client(socket) {
  this.counter = 0
  this.socket = socket
  this.t_queue = {}
  this.tmout = null
}

Client.prototype.writeData = function(d, id) {
  var socket = this.socket
  var t_queue = this.t_queue

  if (socket.writable) {
    var key = socket.remoteAddress + ':' + socket.remotePort
    socket.write('[R]' + d, function() {
      delete t_queue[id]
    })
    process.stdout.write(key + ' ' + socket.bytesWritten + ' bytes written\n')
  }
}
var clients = {}

server.on('connection', function(socket) {
  console.log('gogogo')
  var status = server.getConnections + '/' + server.maxConnections
  var key = socket.remoteAddress + ':' + socket.remotePort
  console.log('connect:' + status + ' ' + key)
  clients[key] = new Client(socket)
  controlSocket(clients[key], 'pause', 10)
})

function controlSocket(client, action, delay) {
  var socket = client.socket
  var key = socket.remoteAddress + ':' + socket.remotePort
  if (action === 'pause') {
    socket.pause()
    console.log(key + ' socket paused')
    client.tmout = setTimeout(function() {
      controlSocket(client, 'resume', Math.random() * 3 * 1000)
    }, delay)
  } else if (action === 'resume') {
    socket.resume()
    console.log(key + ' socket resume')
    client.tmout = setTimeout(function() {
      controlSocket(client, 'pause', Math.random() * 10 * 1000)
    }, delay)
  }
}

server.on('connection', function(socket) {
  var data = ''
  var newline = /\r\n|\n/

  socket.on('data', function(chunk) {
    data += chunk.toString()
    var key = socket.remoteAddress + ':' + socket.remotePort
    if (newline.test(data)) {
      clients[key].writeData(data)
      process.stdout.write(key + ' ' + socket.bytesRead + ' byte read')
      data = ''
    }
  })
})

server.on('connection', function(socket) {
  var key = socket.remoteAddress + ':' + socket.remotePort
  socket.on('end', function() {
    var status = server.getConnections + '/' + server.maxConnections

    console.log('connect end:' + status + ' ' + key)
    if(clients[key].tmout){
      clearTimeout(clients[key].tmout)
    }
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
    if(clients[i].tmout){
      clearTimeout(clients[i].tmout)
    }
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



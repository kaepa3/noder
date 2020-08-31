var net = require('net')
var readline = require('readline')

var options = {}

options.host = process.argv[2]
options.port = process.argv[3]

var client = net.connect(options)

client.on('error', function(e) {
  console.log('connect:' + options.host + ':' + options.port)
})

client.on('connect', function(){
  console.log('connect:' + options.host+ ':' + options.port)
})

var rl = readline.createInterface(process.stdin, process.stdout)
rl.on('SIGINT', function() {
  console.log('connect close:' + options.host + ':' + options.port)
  client.end()
  rl.close()
})

client.setTimeout(1000)
client.on('timeout', function() {
  var str = ''
  for (var i = 0; i < 20000; i++){
    str += 'hello world open'
  }
  str += '\n'

  var ret = client.write(str)
  process.stdout.write('write:' + ret + ', ' + 
  client.bytesWritten + ', ' + 
  client.bufferSize + 'byte\n')
})

client.on('drain', function() {
  console.log('drain')
})


client.on('end', function(had_error) {
  client.setTimeout(0)
  console.log('Connct end:' + options.host + ':' + options.port)
  process.stdout.write(chunk.toString())
})

client.on('close', function() {
  console.log('closed')
  rl.close()
})

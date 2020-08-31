var http= require('http')

http.createServer(function(req,res){
  var num  = parseInt(req.url.slice(1))
  if(isNaN(num)){
    res.end()
    return
  }
  res.writeHead(200, {'Content-type':"text/plain"})
  res.end('fib(' + num +') = ' + fib(num))
}).listen(1337, '127.0.0.1')

console.log('server running at localhost')

function fib(n){
  if(n === 0 || n === 1) return 1;
  return fib(n-1) + fib(n-2)
}

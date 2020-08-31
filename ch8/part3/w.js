var fs = require('fs')
fs.writeFile('target.txt', 'some data', 'utf-8', function(err) {
  if (err) throw err
  fs.readFile('target.txt', 'utf-8', function(err, data) {
    if(err) throw err
    console.log(data)

  })
})

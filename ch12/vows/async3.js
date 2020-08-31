var vows = require('vows'),  events = require('events')
  assert = require('assert'), fs = require('fs')

vows.describe('test fs').addBatch({
  'read_file_async' : {
    topic: function(){
      var emitter = new events.EventEmitter()
      fs.readFile('./testFile.txt', 'utf8', function(err, data){
        if(err){
          emitter.emit('error', err)
        }else{
          emitter.emit('success', data)
        }
      })
      return emitter
    },
    'can be successed': function(err, data){
      assert.isNull(err)
      assert.equal(data, 'inner text of testfile!\r\n')
    }
  }
}).export(module)

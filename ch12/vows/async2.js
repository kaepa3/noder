var vows = require('vows'), 
  assert = require('assert'), fs = require('fs')

vows.describe('test fs').addBatch({
  'read_file_async' : {
    topic: function(){
      console.log('start')
      fs.readFile('./testFile.txt', 'utf8', this.callback)
    },
    'can be successed': function(data){
      console.log('end')
      assert.equal(data, 'inner text of testfole!\n')
    }
  }
}).export(module)

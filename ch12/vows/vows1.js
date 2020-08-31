var vows = require('vows'), assert = require('assert')

vows.describe('suite name').addBatch({
  'context name':{
    topic: 'Hello',
    'vow name': function(topic){
      assert.equal(topic, 'Hello')
    }
  }
}).run()

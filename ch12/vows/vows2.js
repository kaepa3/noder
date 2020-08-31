var vows = require('vows'), assert = require('assert')

var i = 0

vows.describe('suite name').addBatch({
  'context name': {
    topic: function() {
      return ++i
    },
    'topic1': function(topic) {
      assert.equal(topic, 1)
    },
    'topic2': function(topic) {
      assert.equal(topic, 2)
    }
  }
}).export(module)

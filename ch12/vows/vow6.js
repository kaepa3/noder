var vows = require('vows'), assert = require('assert')


vows.describe('nest').addBatch({
  'parent': {
    topic: 10,
    'child': {
      topic: function(parent) {
        return parent * 2
      },
      'child vow': function(topic) {
        assert.equal(topic, 20)
      },
      'son': {
        topic: function(parent) {
          return parent * 2
        },
        'son vow': function(topic) {
          assert.equal(topic, 40)
        },
        'son son': {
          topic: function(parent, grampa, great_granpa) {
            var ans = parent // 40
              + grampa
              + great_granpa
            return ans
          },
          'son son vow': function(topic) {
            assert.equal(topic, 70)
          }
        },
      }
    }
  }
}).export(module)

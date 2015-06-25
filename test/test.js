var assert = require('assert'),
    Framer = require('../').framer,
    windows = require('../').windows;

describe('Framer', function() {
  describe('1,2,3,4,5,6,7,8', function() {
    var frame = new Framer({
      stepS: 1,
      sizeS: 4
    }).frame;
    it('should compute [1,2,3,4], [3,4,5,6], [5,6,7,8], [7,8] with a step of 2 and size of 4', function() {
      var count = 0;

      frame([1,2,3,4,5,6,7,8], function(frame, fIx) {
          console.log(frame, fIx);
        }
      );
    });
  });
});
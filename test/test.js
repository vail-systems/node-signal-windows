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
      var pass = true;

      frame([1,2,3,4,5,6,7,8], function() {
          switch (count) {
            case 0:
              console.log('case 0');
              break;
            case 1:
              console.log('case 1');
                break;
            case 2:
              console.log('case 2');
              break;
            case 3:
              console.log('case 3');
              break;
            default:
              console.log('We should not get here.')
              pass = false;
              break;
          }
          assert(pass);
        }
      );

      assert(pass);

    });
  });
});
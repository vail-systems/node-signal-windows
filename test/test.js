var assert = require('assert'),
    Framer = require('../').framer,
    windows = require('../').windows;

describe('Framer', function() {
    var expFrames1 = [[1,2,3,4],
                      [2,3,4,5],
                      [3,4,5,6],
                      [4,5,6,7],
                      [5,6,7,8]];

    var expFrames2 = [[1,2,3,4],
                     [3,4,5,6],
                     [5,6,7,8]];

    var expFrames3 = [[1,2,3,4],
                      [3,4,5,6],
                      [5,6,7,8],
                      [7,8,9]];

    describe('Step size 1, frame size 4', function() {
      var frame = new Framer({
        stepSize: 1,
        frameSize: 4,
        sampleType: 'Int8'
      });

      it('Array', function(done) {
        frame.frame([1,2,3,4,5,6,7,8], frameHandler.bind(null, done));
      });

      it('Buffer', function(done) {
        frame.frame(new Buffer([1,2,3,4,5,6,7,8]), frameHandler.bind(null, done));
      });

      function frameHandler(done, frame, frameIx) {
        assert.deepEqual(frame, expFrames1[frameIx], 'Frame not framed properly.');
        if (frameIx == 4) done();
      }
    });
    
    describe('Step size 2, frame size 4', function() {
      var frame = new Framer({
        stepSize: 2,
        frameSize: 4
      });

      it('Array', function(done) {
        frame.frame([1,2,3,4,5,6,7,8], frameHandler.bind(null, done));
      });

      it('Buffer', function(done) {
        frame.frame(new Buffer([1,2,3,4,5,6,7,8]), frameHandler.bind(null, done));
      });
 
      function frameHandler(done, frame, frameIx) {
        assert.deepEqual(frame, expFrames2[frameIx], 'Frame not framed properly.');

        if (frameIx == 2) done();
      }
    });

    describe('Step size 2, frame size 4, trailing samples', function() {
      var frame = new Framer({
        stepSize: 2,
        frameSize: 4
      });

      it('Array', function(done) {
        frame.frame([1,2,3,4,5,6,7,8,9], frameHandler.bind(null, done));
      });
 
      it('Buffer', function(done) {
        frame.frame(new Buffer([1,2,3,4,5,6,7,8,9]), frameHandler.bind(null, done));
      });

      function frameHandler(done, frame, frameIx) {
        assert.deepEqual(frame, expFrames3[frameIx], 'Frame not framed properly.');

        if (frameIx == 3) done();
      }
    });
});

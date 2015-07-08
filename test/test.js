var assert = require('assert'),
    Framer = require('../').framer,
    windows = require('../').windows;

describe('Windows', function () {
  describe('Hamming', function () {
    it('should have proper length and start and end should be equal.', function () {
      var ham = windows.construct('ham', 100);

      assert.equal(ham.length, 100);
      assert.equal(ham[0], ham[99]);
    });
  });
});

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
        frameStep: 1,
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
    
    describe('Step size 1, frame size 4, Custom Buffer Types', function() {
      
      it('Buffer UInt16LE', function(done) {
        var frame = new Framer({
          frameStep: 1,
          frameSize: 4,
          sampleType: 'UInt16LE',
          wordSize: 2
        });

        var buffer = new Buffer(2*8); // 2 byte words
        [1,2,3,4,5,6,7,8].forEach(function (v, ix) {buffer.writeUInt16LE(v, ix*2)});
        frame.frame(buffer, frameHandler.bind(null, done));
      });
      
      it('Buffer UInt16LE', function(done) {
        var frame = new Framer({
          frameStep: 1,
          frameSize: 4,
          sampleType: 'UInt32BE',
          wordSize: 4
        });

        var buffer = new Buffer(4*8); // 4 byte words
        [1,2,3,4,5,6,7,8].forEach(function (v, ix) {buffer.writeUInt32BE(v, ix*4)});
        frame.frame(buffer, frameHandler.bind(null, done));
      });


      function frameHandler(done, frame, frameIx) {
        assert.deepEqual(frame, expFrames1[frameIx], 'Frame not framed properly.');
        if (frameIx == 4) done();
      }
    });

    
    describe('Step size 2, frame size 4', function() {
      var frame = new Framer({
        frameStep: 2,
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
        frameStep: 2,
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

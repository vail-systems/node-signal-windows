/*===========================================================================*\
 * Framer for breaking a U-Law ByteBuffer or Array into windows of a particular
 * size at an arbitrary step.
 *
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
\*===========================================================================*/
var Framer = function (options) {
  options = options || {};

  this.frameIx = 0;
  this.frameSize = options.frameSize || 64;
  this.stepSize = options.stepSize|| this.frameSize;
  this.map = options.map || undefined;
  this.scale = options.scale || undefined;
  this.offset = options.offset ? options.offset : 0;
  this.sampleType = options.sampleType || 'UInt8';
};

Framer.prototype = {
  /**
   * Frames a buffer of single-byte char values or an array of Numbers into windows of the specified size.
   */
  frame: function(bufferOrArray, callback) {
    var self = this,
        ix = this.offset,
        frame = [],
        isArray = Object.prototype.toString.call( bufferOrArray) === '[object Array]';

    self.frameIx = 0;

    while (ix < bufferOrArray.length) {
      var value = isArray ? bufferOrArray[ix] : bufferOrArray['read' + self.sampleType](ix); 

      frame.push(this.map ? this.map[value] : value);

      if (frame.length == this.frameSize || ix+1 == bufferOrArray.length) finishFrame(frame);

      ix++;
    }

    // Did we not process any frames at all for some reason?
    if (this.frameIx == 0) callback(undefined);

    function finishFrame(frame) {
      if (this.scale) frame = frame.map(function (s, ix) {return s * self.scale[ix];});

      callback(frame, self.frameIx);

      if (ix != bufferOrArray.length - 1)
      {
          ix -= (self.frameSize - self.stepSize);

          self.frameIx++;
          frame.length = 0;
      }
    }
  }
};

module.exports = Framer;

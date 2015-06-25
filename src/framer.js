/*===========================================================================*\
 * Framer for breaking buffer into windows of a particular size at an
 * arbitrary step.
 *
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
\*===========================================================================*/
var Framer = function (options) {
    options = options || {};

    this.fIx = 0;
    this.sizeS = options.sizeS || 64;
    this.stepS = options.stepS || this.sizeS;
    this.map = options.map || undefined;
    this.scale = options.scale || undefined;
    this.offset = options.offset || 0;
};

Framer.prototype = {
    frame: function(buffer, callback) {
        console.log('entering frame');
        console.log('buffer: ' + buffer);
        console.log('callback: ' + JSON.stringify(callback));
        var self = this,
            cb = this.offset,
            frame = [];

        while (cb < buffer.length) {
            if (this.map) frame.push(this.map[buffer.readUInt8(cb)]);
            else frame.push(buffer.readUInt8(cb));

            if (frame.length == this.sizeS)
            {
                if (this.scale)
                    frame = frame.map(function (s, ix) {
                        return s * self.scale[ix];
                    });

                callback(frame, this.fIx);
                frame = [];
                cb -= (this.sizeS - this.stepS);
                this.fIx++;
            }
            cb++;
        }
    }
};

module.exports = Framer;

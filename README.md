# node-signal-windows
Node.js implementation of a sample framer to break a stream of audio samples into discrete sets for easy processing of FFT. Also includes a few window functions like Hamming.

# Introduction
The framer included in this package is designed to frame a collection of samples to a given size and pass each frame to a callback.

The optional windowing functions are used for things like minimizing spectral leakage when processing a given frame with the Fast Fourier Transform. Windowing functions and their characteristics can be found [here](https://en.wikipedia.org/wiki/Window_function).

# Windowing Function Example

    var windows = require('signal-windows').windows,
        signal = [1,1,1,1,1];

    // Returns an Array of signal.length coefficients by which you can scale a set of samples
    var hamCoef = windows.construct('ham', signal.length);

    console.log(hamCoef); // Output all the coefficients

# Framer Example (Array)

    var Framer = require(signal-windows').Framer,
        framer = new Framer({
          frameSize: 4, 
          frameStep: 2
        }),
        signal = [1,2,3,4,5,6,7,8];

    framer.frame(signals, console.log); // [1,2,3,4]
                                        // [3,4,5,6]
                                        // [5,6,7,8]
                                        // [7,8]
                                        
# Framer Example (ByteBuffer)

    var Framer = require(signal-windows').Framer,
        framer = new Framer({
          frameSize: 4, 
          frameStep: 2,
          sampleType: 'UInt8', // See Buffer read methods for types available (e.g. UInt16LE, UInt16BE, etc.) 
          wordSize: 1          // wordSize is number of octets represent a single value
        }),
        signal = new Buffer([1,2,3,4,5,6,7,8]);

    framer.frame(signals, console.log); // [1,2,3,4]
                                        // [3,4,5,6]
                                        // [5,6,7,8]
                                        // [7,8]

# Special Considerations

If the buffer size modulus the frame size is not 0, it is your responsibility to either pad the frame with '0's before passing into an FFT or to save the remaining samples and prepend them to the next buffer.

# Testing

`mocha`

    Windows
    Hamming
    ✓ should have proper length and start and end should be equal.

    Framer
    Step size 1, frame size 4
    ✓ Array
    ✓ Buffer
    Step size 1, frame size 4, Custom Buffer Types
    ✓ Buffer UInt16LE
    ✓ Buffer UInt16LE
    Step size 2, frame size 4
    ✓ Array
    ✓ Buffer
    Step size 2, frame size 4, trailing samples
    ✓ Array
    ✓ Buffer

    9 passing (16ms)

# License 

The MIT License (MIT)

Copyright (c) 2015 Vail Systems

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# node-signal-windows
Node.js implementation of a framer to generate sample windows, and window functions to operate on those windows in the context of DSP applications.  For now we only have the Hamming window, Tukey, and rectangular window but this may be expanded to include others.

# Introduction
The framer included in this package is designed to frame samples to a given window size and pass each window to a callback.

The windowing functions are used for things like minimizing spectral leakage when processing a given window with the FFT. Windowing functions and their characteristics, can be found [here](https://en.wikipedia.org/wiki/Window_function).

# Window Function Example

    var windows = require('signal-windows').windows,
        signal = [1,1,1,1,1];

    var hamCoef = windows.construct('ham', signal.length);

    console.log(hamCoef); // Output all the coefficients (should start low, increase, and return to low)

# Framer Example

    var Framer = require(signal-windows').Framer,
        frame = new Framer({
          sizeS: 4, 
          stepS: 2
        }).frame,
        signal = [1,2,3,4,5,6,7,8];

    frame(signals, console.log); // [1,2,3,4]
                                 // [3,4,5,6]
                                 // [5,6,7,8]
                                 // [7,8]

Note: if the buffer size modulus the frame size is not 0, it is your responsibility to either pad the frame with 0s before passing into an FFT or to save the remaining samples and prepend them to the next buffer.

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

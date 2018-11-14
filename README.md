# mix-fft
An implementation of the Fast Fourier Transform in JavaScript. It uses a mixed method, combining the Prime Factor FFT Algorithm(PFA) and Cooley-Tukey Method.
It's hard to find PFA's implementation code online, so I'm not sure my implementation is correct or not. I tested a small amount of data, and the results were consistent with the results obtained by MATLAB.
Anyway, the most important thing is to be happy!

## Test
```javascript
var mix_fft = require('./mix_fft'),
    signal = [0, 4, 4, 4, 2, 7];
var phasors = mix_fft.fft(signal);
console.log(phasors);
```
The answer is [21.0000 + 0.0000i  -1.5000 + 0.8660i  -4.5000 + 4.3301i  -9.0000 + 0.0000i -4.5000 - 4.3301i  -1.5000 - 0.8660i] (by MATLAB).

## Thanks
[Waxspin's node-fft](https://github.com/vail-systems/node-fft)
# mix-fft
An implementation of the Fast Fourier Transform in JavaScript. It uses a mixed method, combining the Prime Factor FFT Algorithm(PFA) and Cooley-Tukey Method.

It's hard to find PFA's implementation code online, so I'm not sure my implementation is correct or not. I tested a small amount of data, and the results were consistent with the results obtained by MATLAB.

Anyway, the most important thing is to be happy! It's just a course project.

## Dependency
```
node v9.10.1
    bit-twiddle 1.0.2
    opencv4nodejs 4.10.0
opencv 3.4.1
```

## Test
```javascript
var mix_fft = require('./mix_fft'),
    signal = [0, 4, 4, 4, 2, 7];
var phasors = mix_fft.fft(signal);
console.log(phasors);
```
The answer is `[21.0000 + 0.0000i  -1.5000 + 0.8660i  -4.5000 + 4.3301i  -9.0000 + 0.0000i -4.5000 - 4.3301i  -1.5000 - 0.8660i]` (by MATLAB).

## Apply to images
I wrote a function `main` to make it could be used for images. I tried `lena.png` to test it and (maybe) got a satisfactory result, although the image after Fourier transform is hideous...

## Thanks
[Waxspin's node-fft](https://github.com/vail-systems/node-fft)
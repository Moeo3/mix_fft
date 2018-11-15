let cv = require('opencv4nodejs'),
    fft = require('./fft_2D'),
    Complex = require('./src/Complex');

let main = function () {
    let image = cv.imread('./lena.png');
    let image_array = image.bgrToGray().getDataAsArray();
    for (let i = 0; i < image_array.length; ++ i) {
        for (let j = 0; j < image_array[0].length; ++ j) {
            image_array[i][j] *= Math.pow(-1, i + j);
        }
    }
    let fft_res = fft.fft(image_array);
    let image_res = [], max = -Infinity, min = Infinity;
    for (let i = 0; i < fft_res.length; ++ i) {
        image_res[i] = [];
        for (let j = 0; j < fft_res[0].length; ++ j) {
            image_res[i][j] = Math.log(Complex.magnitude(fft_res[i][j]));
            max = Math.max(max, image_res[i][j]), min = Math.min(min, image_res[i][j]);
        }
    }
    image_res = image_res.map((row) => row.map((ele) => Math.round((ele - min) * 255 / (max - min))));
    const matGray = new cv.Mat(image_res, cv.CV_8UC1);
    cv.imshow('test', matGray);
    cv.waitKey();
}

main();
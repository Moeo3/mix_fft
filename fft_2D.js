let mix_fft = require('./src/mix_fft');

let fft_2D = function(image) {
    let N = image.length, M = image[0].length;
    let row = [], col = [], res = [];
    
    for (let i = 0; i < N; ++ i) {
        row[i] = mix_fft.fft(image[i]);
    }
    for (let j = 0; j < M; ++ j) col[j] = [];
    for (let i = 0; i < N; ++ i) {
        for (let j = 0; j < M; ++ j) {
            col[j][i] = row[i][j];
        }
    }
    for (let j = 0; j < M; ++ j) {
        row[j] = mix_fft.fft(col[j]);
    }

    for (let i = 0; i < N; ++ i) {
        res[i] = [];
        for (let j = 0; j < M; ++ j) {
            res[i][j] = row[j][i];
        }
    }

    return res;
}

module.exports = {
    fft: fft_2D
}
/*
var img = [[200, 200], [156, 156]];
var p = fft_2D(img);

console.log(p);
*/
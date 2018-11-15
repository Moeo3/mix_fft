let mix_fft = require('./src/mix_fft');

let fft_2D = function(image) {
    let N = image.length, M = image[0].length;
    let row = [], col = [], res = [];

    // image: N * M 
    for (let i = 0; i < N; ++ i) {
        row[i] = mix_fft.fft(image[i]);
    }
    //console.log(row);
    for (let j = 0; j < M; ++ j) col[j] = [];
    for (let i = 0; i < N; ++ i) {
        for (let j = 0; j < M; ++ j) {
            col[j][i] = row[i][j];
        }
    }
    //console.log(col);
    for (let j = 0; j < M; ++ j) {
        row[j] = mix_fft.fft(col[j]);
    }

    for (let i = 0; i < N; ++ i) {
        res[i] = [];
        for (let j = 0; j < M; ++ j) {
            res[i][j] = [];
            res[i][j][0] = row[j][i][0] / (M * N);
            res[i][j][1] = row[j][i][1] / (M * N);
        }
    }

    return res;
}

module.exports = {
    fft: fft_2D
}
/*
var img = [[2, 4], [3, 11], [4, 7]];
var p = fft_2D(img);

console.log(p);
*/
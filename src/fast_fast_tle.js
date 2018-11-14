let Complex = require('./Complex'),
    euler = require('./euler'),
    twiddle = require('bit-twiddle');
    
let fft = function(vector) {
    let X = [], N = vector.length;
    let even = function (__, ix) {
        return ix % 2 == 0;
    };
    let odd = function (__, ix) {
        return ix % 2 == 1;
    }

    if (N == 1) {
        if (Array.isArray(vector[0])) return [[vector[0][0], vector[0][1]]];
        return [[vector[0], 0]];
    }

    let X_evens = fft(vector.filter(even)), 
        X_odds = fft(vector.filter(odd));

    for (let i = 0; i < N / 2; ++ i) {
        let t = X_evens[i],
            e = Complex.multiply(euler.exponent(i, N), X_odds[i]);
        X[i] = Complex.add(t, e);
        X[i + (N / 2)] = Complex.subtract(t, e);
    } 
    return X;
}

let inplace_fft = function (vector) {
    let N = vector.length;
    let trailing_zeros = twiddle.countTrailingZeros(N);

    for (let i = 0; i < N; ++ i) {
        let p = twiddle.reverse(i) >>> (twiddle.INT_BITS - trailing_zeros);
        if (p > i) {
            let temp = [vector[i], 0];
            vector[i] = vector[p];
            vector[p] = temp;
        } else {
            vector[p] = [vector[p], 0];
        }
    }

    for (let len = 2; len <= N; len = len * 2) {
        for (let i = 0; i < len / 2; ++ i) {
            let e = euler.exponent(i, len);
            for (let j = 0; j < N / len; ++ j) {
                let t = Complex.multiply(e, vector[(j * len) + i + (len / 2)]);
                let s = vector[(j * len) + i];
                vector[(j * len) + i + (len / 2)] = Complex.subtract(s, t);
                vector[(j * len) + i] = Complex.add(s, t);
                
            }
        }
    } 
    return vector
}

module.exports = {
    fft: fft,
    inplace_fft: inplace_fft
}
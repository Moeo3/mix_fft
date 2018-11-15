let Complex = require('./Complex'),
    euler = require('./euler');

let dft = function (vector) {
    var X = [], N = vector.length;
    if (! Array.isArray(vector[0])) {
        for (let i = 0; i < N; ++ i) vector[i] = [vector[i], 0];
    }
    for (let i = 0; i < N; ++ i) {
        X[i] = [0, 0];
        for (let j = 0; j < N; ++ j) {
            let exp = euler.exponent(i * j, N);
            let term = Complex.multiply(vector[j], exp);
            X[i] = Complex.add(term, X[i]);
        }
    }
    return X;
}

module.exports = {
    dft: dft
}
/*
var signal = [ [ 2, 0 ], [ 0, 0 ] ];
var p = dft(signal);
console.log(p);
*/
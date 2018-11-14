let twiddle = require('bit-twiddle');

let Complex = new class {
    add(a, b) {
        return [a[0] + b[0], a[1] + b[1]];
    }
    subtract(a, b) {
        return [a[0] - b[0], a[1] - b[1]];
    }
    multiply(a, b) {
        return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
    }
    magnitude(x) {
        return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
    }
}

let map_exponent = {},
    euler = function (k, N) {
        let x = -2 * Math.PI * (k / N);
        map_exponent[N] = map_exponent[N] || {};
        map_exponent[N][k] = map_exponent[N][k] || [Math.cos(x), Math.sin(x)];
        return map_exponent[N][k];
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
            let e = euler(i, len);
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

let signal = [1, 1, 1, 1, 0, 0, 0, 0];
let phasors = inplace_fft(signal);

console.log(phasors);
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
            e = Complex.multiply(euler(i, N), X_odds[i]);
        X[i] = Complex.add(t, e);
        X[i + (N / 2)] = Complex.subtract(t, e);
    } 
    return X;
}


let signal = [1, 1, 1, 1, 0, 0, 0, 0];
let phasors = fft(signal);

console.log(phasors);
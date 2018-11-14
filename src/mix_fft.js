let Complex = require('./Complex'),
    dft = require('./design_from_trash'),
    fft = require('./fast_fast_tle'),
    transf = require('./transf');

const max_prime_factor = 37;

let get_prime = function(N) {
    let mark = [], prime = [];
    for (let i = 2; i <= N; ++ i) {
        if (! mark[i]) prime.push(i)
        for (let j = 0; j < prime.length && i * prime[j] <= N; ++ j) {
            mark[i * prime[j]] = true;
            if (i % prime[j] == 0) break;
        }
    }
    return prime;
}

let factorize = function (N, prime) {
    let fact = [];
    if (N == 1) return [1];
    for (i = 0; i < prime.length; ++ i) {
        while ((N % prime[i]) == 0) {
            N = N / prime[i];
            fact.push(prime[i]);
        }
    }
    if (N > 1) fact.push(N);
    return fact;
}

let mix_fft = function (vector) {
    let X = [], N = vector.length;
    let sofar_radix = [], remain_radix = [];

    let prime = get_prime(max_prime_factor);
    let fact = factorize(N, prime);
    if (fact[fact.length - 1] > max_prime_factor) {
        let lim = 1;
        while (lim < vector.length) lim *= 2;
        for (let i = vector.length; i < lim; ++ i) vector.unshift(0);
        //console.log(vector);
        X = fft.inplace_fft(vector);
    } else {
        remain_radix.push(N); sofar_radix.push(1);
        for (let i = 1; i <= fact.length; ++ i) {
            sofar_radix[i] = sofar_radix[i - 1] * fact[i - 1];
            remain_radix[i] = remain_radix[i - 1] / fact[i - 1];
        }

        // begin permute
        let count = [];
        for (let i = 0; i < N; ++ i) count.push(0);
        let position = 0;
        for (let i = 0; i < N - 1; ++ i) {
            X[i] = vector[position];
            let fact_now = 0;
            position = position + remain_radix[fact_now + 1];
            ++ count[fact_now];
            while (count[fact_now] >= fact[fact_now]) {
                count[fact_now] = 0;
                position = position - remain_radix[fact_now] + remain_radix[fact_now + 2];
                ++ fact_now; ++ count[fact_now];
            }
        }
        X[N - 1] = vector[N - 1];
        
        for (let i = 0; i < fact.length; ++ i) {
            // i : fact_now
            //console.log(typeof transf.twiddle_transf);
            transf.twiddle_transf(sofar_radix[i], fact[i], remain_radix[i + 1], X);
            //console.log(X);
        }
    }
    return X;
}

var signal = [0, 4, 4, 4, 2, 7];
var p = mix_fft(signal);
/*
const eps = 0.0001;

for (let i = 0; i < p.length; ++ i) {
    for (let j = 0; j < 2; ++ j) {
        if (p[i][j] < eps) p[i][j] = 0;
    }
}
*/
//console.log(p);

var out = p.map((row) => row.map((ele) => Number((ele + 1e-7).toFixed(2))));
console.log(out);
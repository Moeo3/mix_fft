let map_exponent = {};

const PI = Math.PI;

let euler = function (k, N) {
    let x = -2 * PI * (k / N);
    map_exponent[N] = map_exponent[N] || {};
    map_exponent[N][k] = map_exponent[N][k] || [Math.cos(x), Math.sin(x)];
    return map_exponent[N][k];
} 

module.exports = {
    exponent: euler
}
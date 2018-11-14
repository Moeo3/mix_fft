let add = function (a, b) {
    return [a[0] + b[0], a[1] + b[1]];
};
let subtract = function (a, b) {
    return [a[0] - b[0], a[1] - b[1]];
};
let multiply = function (a, b) {
    return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
}
let magnitude = function (x) {
    return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
}

module.exports = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    magnitude: magnitude
};
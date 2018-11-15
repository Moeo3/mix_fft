let Complex = require('./Complex'),
    dft = require('./dft');

let twiddle_transf = function (sofar_radix, fact, remain_radix, X) {
    let omega = 2 * Math.PI / (sofar_radix * fact);
    let cos_omega = Math.cos(omega), sin_omega = - Math.sin(omega);
    let tw = [1, 0];
    let data_offset = 0, group_offset = 0, adr = 0;
    let twiddle = [];

    for (let data_number = 0; data_number < sofar_radix; ++ data_number) {
        if (sofar_radix > 1) {
            twiddle[0] = ([1, 0]); twiddle[1] = [tw[0], tw[1]];
            for (tw_number = 2; tw_number < fact; ++ tw_number) {
                twiddle[tw_number] = Complex.multiply(tw, twiddle[tw_number - 1]);
            }
            let gem = cos_omega * tw[0] - sin_omega * tw[1];
            tw[1]   = sin_omega * tw[0] + cos_omega * tw[1];
            tw[0]   = gem;
        }
        let Z = [];
        for (let group_number = 0; group_number < remain_radix; ++ group_number) {
            if ((sofar_radix > 1) && (data_number > 0)) {
                Z[0] = X[adr];
                for (let block_number = 1; block_number < fact; ++ block_number) {
                    adr = adr + sofar_radix;
                    Z[block_number] = Complex.multiply(twiddle[block_number], X[adr]);
                }
            } else {
                for (let block_number = 0; block_number < fact; ++ block_number) {
                    Z[block_number] = X[adr];
                    adr = adr + sofar_radix;
                }
            }
            Z = dft.dft(Z);
            adr = group_offset;
            for (let block_number = 0; block_number < fact; ++ block_number) {
                X[adr] = Z[block_number];
                adr = adr + sofar_radix;
            }
            group_offset = group_offset + sofar_radix * fact;
            adr = group_offset;
        }
        data_offset = data_offset + 1;
        adr = group_offset = data_offset;
    }
    return X;
}
/*
var X =  [ 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0 ],
sofar_radix = 1,
remain_radix = 6,
fact = 2;

var p = twiddle_transf(sofar_radix, fact, remain_radix, X);
console.log(p)
*/

module.exports = {
    twiddle_transf: twiddle_transf
};
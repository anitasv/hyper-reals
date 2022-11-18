import * as minor_ops from "./minor_ops";
import { 
    hyper, 
    mapHyper, 
    zipHyper,
    MajorFunction, 
    BiMajorFunction
} from "./major";

export const add : BiMajorFunction = (ha, hb) => 
    zipHyper(ha, hb, minor_ops.add);

export const mul : BiMajorFunction = (ha, hb) => {
    if (ha.arr.length == 0 || hb.arr.length == 0) {
        return hyper([]);
    }
    const aSize = ha.arr.length;
    const bSize = hb.arr.length;
    const outputSize = (aSize - 1) + (bSize - 1) + 1;
    const output = new Array(outputSize);
    ha.arr.forEach((a, i) => {
        hb.arr.forEach((b, j) => {
            const product = minor_ops.mul(a, b);
            const read = output[i + j];
            const write = read === undefined ? product : minor_ops.add(read, product);
            output[i + j] = write;
        })});
    return hyper(output);
};

export const neg : MajorFunction = (ha) => 
    mapHyper(ha, minor_ops.neg);

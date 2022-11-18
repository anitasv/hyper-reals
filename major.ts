import { repr, Expression, BiMinorFunction } from "./minor";

export interface HyperExpression {
    rep: string;
    arr: Expression[];
}

export type MajorFunction = (ha: HyperExpression) => HyperExpression;

export type BiMajorFunction = (ha: HyperExpression, hb: HyperExpression) => HyperExpression;

export function hyper(arr: Expression[]): HyperExpression {
    const rep = arr.length == 0 ? "0" : (arr.length == 1 ? repr(arr[0]) : `[ ${arr.map(repr).join(", ")} ]`);
    return { rep, arr };
}

export function toHyper(exp: Expression): HyperExpression {
    return hyper([exp]);
}

export function mapHyper(ha: HyperExpression, fn: (exp: Expression) => Expression): HyperExpression {
    return hyper(ha.arr.map(fn));
}

export function zipArray<T>(a: T[], b: T[], mixer: (a: T, b: T) => T, ): T[] {
    return a.map((a, i) => mixer(a, b[i]));
}

export function zipHyper(ha: HyperExpression, hb: HyperExpression, mixer: BiMinorFunction): HyperExpression {
    return hyper(zipArray(ha.arr, hb.arr, mixer));
}

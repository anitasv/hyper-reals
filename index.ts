import { Analytic, fun, neg, newAnalyticFunction } from "./analytic";
import { sym, repr, Expression } from "./minor";
import { toHyper, hyper, MajorFunction } from "./major";
import { ONE } from "./syms";
import { mul } from "./major_ops";

const f = fun("f");
const x = toHyper(sym("x"));
const abcde = hyper([sym("a"), sym("b"), sym("c"), sym("d"), sym("e"), sym("f"), sym("g")]);

console.log(f(x).rep);
console.log(f(abcde).rep);

const sinAnalytic: Analytic = {op: sym("sin"), derivative: () => cosAnalytic};
const cosAnalytic: Analytic = {op: sym("cos"), derivative: () => neg(sinAnalytic)};

const sin = newAnalyticFunction(sinAnalytic);
const cos = newAnalyticFunction(cosAnalytic);

console.log(sin(x).rep);
console.log(sin(abcde).rep);

function derivative(fn : MajorFunction) : Expression {
    const x = sym("x")
    return fn(hyper([x, ONE])).arr[1];
}

console.log(repr(derivative(sin)));
console.log(repr(derivative((x) => sin(cos(x)))));
console.log(repr(derivative((x) => sin(cos(mul(x, x))))));
console.log(repr(derivative((x) => sin(cos(mul(x, x))))));

const g = fun("g");
console.log(repr(derivative((x) => f(g(x)))));
console.log(repr(derivative((x) => mul(f(x), g(x)))));
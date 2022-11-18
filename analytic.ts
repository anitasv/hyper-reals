import { sym, applyOp, Expression } from "./minor";
import { ZERO } from "./syms";
import * as minor_ops from "./minor_ops";
import { hyper, MajorFunction } from "./major";

export interface Analytic {
    op: Expression;
    derivative: () => Analytic;
}

export function newAnalyticFunction(analytic : Analytic) : MajorFunction {
    return (ha) => {
        const {arr} = ha;
        const point = arr.length === 0 ? ZERO : arr[0];
        
        const evalAtPoint = (fn : Expression) => applyOp(fn, [point]);

        let current = analytic;

        const output = [evalAtPoint(current.op)]

        for (let i = 1; i < arr.length; i++) {
            const scale = arr[i];
            current = current.derivative();
            const derivative = evalAtPoint(current.op);
            output.push(minor_ops.mul(scale, derivative));
        }
        return hyper(output);
    };
}

function newAnalytic(rep: string) : Analytic {
    function newInternal(rep: string, index: number) : Analytic {
        return {
            op: sym(index == 0 ? rep : `${rep}^${index}`),
            derivative: () => newInternal(rep, index + 1)
        }
    }
    return newInternal(rep, 0);
}

export function fun(rep: string) : MajorFunction {
    return newAnalyticFunction(newAnalytic(rep));
}

export function neg(analytic : Analytic) : Analytic {
    return {
        op: minor_ops.neg(analytic.op),
        derivative: () => neg(analytic.derivative())
    };
}
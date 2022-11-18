export interface Terminal {
    type: "terminal";
    rep: string;
}

export interface Applied {
    type: "applied";
    op: Expression;
    args: Expression[];
}

export type Expression = Terminal | Applied;

// Bootstrap is non simplified expression -0 = -0
export type MinorBootstrap = (a : Expression) => Applied;
export type MinorFunction = (a: Expression) => Expression;

// Bootstrap is non simplified expression a + 0 = a + 0
export type BiMinorBootstrap = (a : Expression, b: Expression) => Applied;
export type BiMinorFunction = (a: Expression, b: Expression) => Expression;

export function sym(rep: string): Terminal {
    return { type: "terminal", rep };
}

export function applyOp(op: Expression, args : Expression[]) : Applied {
    return {type: "applied", op, args};
}

export function repr(exp: Expression) : string {
    switch(exp.type) {
        case "terminal":
            return exp.rep;
        case "applied":
            return `(${repr(exp.op)} ${exp.args.map(repr).join(" ")})`;
    }
}

export function newFunc(op: Expression) : MinorBootstrap {
    return (a) => applyOp(op, [a]);
}

export function newBiFunc(op: Expression) : BiMinorBootstrap {
    return (a, b) => applyOp(op, [a, b]);
}


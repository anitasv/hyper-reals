import * as minor from "./minor";
import * as syms from "./syms";

export const add = minor.newBiFunc(syms.PLUS);

export const mul = minor.newBiFunc(syms.TIMES);

export const neg = minor.newFunc(syms.MINUS);

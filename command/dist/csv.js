"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugRawJpostcode = exports.getJpostcodes = void 0;
const constraints_1 = require("./constraints");
const getJpostcodes = () => {
    const fs = require('fs');
    const rows = fs.readFileSync(constraints_1.csvInfo.path, { encoding: constraints_1.csvInfo.encoding }).split('\n');
    return rows;
};
exports.getJpostcodes = getJpostcodes;
const debugRawJpostcode = (vs) => {
    if (vs.length !== constraints_1.csvInfo.header.length)
        throw new Error('not match column num');
    vs.map((v, i) => console.log(constraints_1.csvInfo.header[i] + ':', v));
};
exports.debugRawJpostcode = debugRawJpostcode;

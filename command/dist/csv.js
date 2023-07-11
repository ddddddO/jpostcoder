"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugRawJpostcode = exports.getJpostcodes = void 0;
const node_fs_1 = require("node:fs");
const constraints_1 = require("./constraints");
const getJpostcodes = () => {
    return (0, node_fs_1.readFileSync)(constraints_1.csv.path, 'utf8').split('\n');
};
exports.getJpostcodes = getJpostcodes;
const debugRawJpostcode = (vs) => {
    if (vs.length !== constraints_1.csv.header.length)
        throw new Error('not match column num');
    vs.map((v, i) => console.log(constraints_1.csv.header[i] + ':', v));
};
exports.debugRawJpostcode = debugRawJpostcode;

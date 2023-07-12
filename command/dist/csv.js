"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugRawJpostcode = exports.getJpostcodes = exports.downloadJpostcodeCSV = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_https_1 = require("node:https");
const constraints_1 = require("./constraints");
const download = (dest, src) => {
    (0, node_https_1.get)(src, res => {
        const fileStream = (0, node_fs_1.createWriteStream)(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
        });
    });
};
const downloadJpostcodeCSV = (dest) => {
    (0, node_fs_1.mkdir)((0, node_path_1.dirname)(dest), { recursive: true }, (err) => {
        if (err)
            throw err;
    });
    download(dest, constraints_1.csv.japan_postcode_csv_url);
};
exports.downloadJpostcodeCSV = downloadJpostcodeCSV;
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

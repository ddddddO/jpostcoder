"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const constraints_1 = require("./constraints");
const command_1 = require("./command");
const options = {
// verbose: console.log // postcodeのinsert時にログが大量に出力されるためコメントアウト
};
const db = new better_sqlite3_1.default(constraints_1.database.path, options);
(0, command_1.command)(db);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.finish = void 0;
const helpers_1 = require("./helpers");
const finish = (_filename, commands) => commands;
exports.finish = finish;
const wrap = (fn) => (next) => (filenames, commands) => (0, helpers_1.ensureArray)(next(filenames, (0, helpers_1.ensureArray)(commands))).concat(fn(filenames));
exports.wrap = wrap;

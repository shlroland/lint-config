"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNamesToCliArg = exports.ensureArray = void 0;
const path_1 = __importDefault(require("path"));
const ensureArray = (obj) => {
    if (obj == null)
        return [];
    return Array.isArray(obj) ? obj : [obj];
};
exports.ensureArray = ensureArray;
const fileNamesToCliArg = (names, base = process.cwd()) => {
    return names.map((f) => path_1.default.relative(base, f)).join(' ');
};
exports.fileNamesToCliArg = fileNamesToCliArg;

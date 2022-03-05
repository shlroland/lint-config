"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.md = exports.css = exports.js = void 0;
const atoms_1 = require("./atoms");
const operators_1 = require("./operators");
exports.js = (0, atoms_1.eslint)((0, atoms_1.prettier)(operators_1.finish));
exports.css = (0, atoms_1.prettier)((0, atoms_1.stylelint)(operators_1.finish));
exports.md = (0, atoms_1.prettier)(operators_1.finish);

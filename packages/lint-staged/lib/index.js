"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const presets_1 = require("./presets");
const config = {
    '*.{ts,tsx}': presets_1.js,
    '*.{js,jsx}': presets_1.js,
    '*.{css,scss,sass,less}': presets_1.css,
    '*.{md,mdx}': presets_1.md,
};
exports.default = config;
module.exports = config;

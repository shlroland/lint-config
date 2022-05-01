"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = exports.init = void 0;
const path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const tasks_1 = require("./tasks");
const detect_1 = require("./utils/detect");
const init = async () => {
    process.chdir(process.cwd());
    const pkgPath = path.join(process.cwd(), 'package.json');
    if (!fs_extra_1.default.existsSync(pkgPath)) {
        throw new Error(`No package.json find in ${process.cwd()}`);
    }
    const client = await (0, detect_1.detectClient)();
    const tasks = await (0, tasks_1.createTasks)();
    tasks.run({ client }).catch((err) => {
        console.error(err);
    });
};
exports.init = init;
var task_1 = require("./cli/task");
Object.defineProperty(exports, "cli", { enumerable: true, get: function () { return task_1.cli; } });

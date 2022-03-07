var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as path from 'path';
import fs from 'fs-extra';
import { createTasks } from './tasks';
// import { exec } from './utils/exec'
export const init = () => __awaiter(void 0, void 0, void 0, function* () {
    process.chdir(process.cwd());
    const pkgPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(pkgPath)) {
        throw new Error(`No package.json find in ${process.cwd()}`);
    }
    const tasks = yield createTasks();
    tasks.run().catch((err) => {
        console.error(err);
    });
});
init();

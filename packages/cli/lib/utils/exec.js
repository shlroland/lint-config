var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { execa } from 'execa';
export const exec = (cmd, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const [shell, ...args] = cmd.split(' ');
    const child = yield execa(shell, args, Object.assign({}, options));
    return child;
});
export const installDep = (dep) => __awaiter(void 0, void 0, void 0, function* () {
    return exec(`pnpm i -D ${dep}`);
});

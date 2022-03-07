var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Lister from 'listr';
import { installDep } from '../utils/exec';
import { createFile, createRootPath, removeFile } from '../utils/file';
import { eslint } from './eslint';
const createTodoList = () => {
    const todoList = [];
    [eslint].forEach((cfgFn) => {
        const cfg = cfgFn();
        const name = cfg.name;
        const installDepsList = cfg.toInstallDeps;
        const removeFileList = cfg.toRemoveFiles;
        const addFileList = cfg.toAddFiles.map((item) => ({
            path: createRootPath(item.name, item.path),
            content: item.content,
        }));
        todoList.push({
            name,
            task: {
                installDepsList,
                removeFileList,
                addFileList,
            },
        });
    });
    return todoList;
};
export const createTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const todoList = createTodoList();
    return new Lister(todoList.map((todo) => {
        const { name, task } = todo;
        return {
            title: `setting ${name}`,
            task: () => {
                return new Lister([
                    {
                        title: `InstallDepsList about ${name}`,
                        task: () => {
                            return installDep(task.installDepsList.join(' '));
                        },
                    },
                    {
                        title: `RemoveFileList  about ${name}`,
                        task: () => Promise.all(task.removeFileList.map(removeFile)),
                    },
                    {
                        title: `AddFileList about ${name}`,
                        task: () => Promise.all(task.addFileList.map((item) => createFile(item.path, item.content))),
                    },
                ]);
            },
        };
    }));
});

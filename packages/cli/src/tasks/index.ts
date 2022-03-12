import Lister from 'listr'
import { installDep } from '../utils/exec'
import { createFile, createRootPath, removeFile } from '../utils/file'
import type { DepWithVersion, Fn } from '../utils/types'
import { commitlint } from './commilint'
import { commitizen } from './commitizen'
import { eslint } from './eslint'
import { husky } from './husky'
import { lintStaged } from './lint-staged'
import { prettier } from './prettier'
import { stylelint } from './stylelint'

interface Task {
  installDepsList: DepWithVersion[]
  removeFileList: string[]
  addFileList: {
    path: string
    content: string
  }[]
  extraTasks?: Fn[]
}

interface TodoItem {
  name: string
  task: Task
}

const createTodoList = () => {
  const todoList: TodoItem[] = []
  ;[
    eslint,
    prettier,
    stylelint,
    commitlint,
    lintStaged,
    commitizen,
    husky,
  ].forEach((cfgFn) => {
    const cfg = cfgFn()
    const name = cfg.name

    const installDepsList = cfg.toInstallDeps
    const removeFileList = cfg.toRemoveFiles ?? []
    const addFileList: Task['addFileList'] =
      cfg.toAddFiles?.map((item) => ({
        path: createRootPath(item.name, item.path),
        content: item.content,
      })) ?? []
    const extraTasks = cfg.extraTasks ?? []
    todoList.push({
      name,
      task: {
        installDepsList,
        removeFileList,
        addFileList,
        extraTasks,
      },
    })
  })

  return todoList
}

export const createTasks = async () => {
  const todoList = createTodoList()

  return new Lister(
    todoList.map((todo) => {
      const { name, task } = todo
      return {
        title: `setting ${name}`,
        task: () => {
          return new Lister([
            {
              title: `InstallDepsList about ${name}`,
              task: () => {
                return installDep(task.installDepsList.join(' '))
              },
            },
            {
              title: `RemoveFileList  about ${name}`,
              task: () => Promise.all(task.removeFileList.map(removeFile)),
            },
            {
              title: `AddFileList about ${name}`,
              task: () =>
                Promise.all(
                  task.addFileList.map((item) =>
                    createFile(item.path, item.content),
                  ),
                ),
            },
            {
              title: `Execute tasks about ${name}`,
              task: () => Promise.all(task.extraTasks.map((item) => item())),
            },
          ])
        },
      }
    }),
  )
}

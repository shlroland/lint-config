import Lister from 'listr'
import { createRootPath } from '../utils/file'
import { createListrTask } from '../utils/generate'
import type { Task } from '../utils/types'
import { commitlint } from './commilint'
import { commitizen } from './commitizen'
import { eslint } from './eslint'
import { husky } from './husky'
import { lintStaged } from './lint-staged'
import { prettier } from './prettier'
import { stylelint } from './stylelint'

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
    const removeFileList = cfg.toRemoveFiles
    const addFileList: Task['addFileList'] = cfg.toAddFiles?.map((item) => ({
      path: createRootPath(item.name, item.path),
      content: item.content,
    }))
    const extraTasks = cfg.extraTasks
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
          return new Lister(createListrTask(name, task))
        },
      }
    }),
  )
}

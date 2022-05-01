import Lister from 'listr'
import type { ListerCtx } from '../types'
import { createRootPath } from '../utils/file'
import { createListrTask } from '../utils/generate'
import type { Task } from '../utils/types'
import { commitlint } from './commilint'
import { commitizen } from './commitizen'
import { eslint } from './eslint'
import { gitHooks } from './githooks'
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
    gitHooks,
  ].forEach((cfgFn) => {
    const cfg = cfgFn()
    const name = cfg.name

    const predecessorTasks = cfg.predecessorTasks
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
        predecessorTasks,
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

  return new Lister<ListerCtx>(
    todoList.map((todo) => {
      const { name, task } = todo
      return {
        title: `setting ${name}`,
        task: (ctx) => {
          return new Lister<ListerCtx>(createListrTask(name, task, ctx))
        },
      }
    }),
  )
}

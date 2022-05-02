import inquirer from 'inquirer'
import Lister from 'listr'
import type { ListerCtx } from './types'
import { createRootPath } from './utils/file'
import { createListrTask } from './utils/generate'
import type { Task, TaskFn } from './utils/types'
import { camelize } from './utils/F'
interface TodoItem {
  name: string
  task: Task
}

const TASK_LIST = [
  'eslint',
  'prettier',
  'stylelint',
  'commitlint',
  'lint-staged',
  'commitizen',
  'gitHooks',
]

const generateTaskList = async () => {
  const list = await inquirer.prompt<{ tasks: string[] }>([
    {
      type: 'checkbox',
      name: 'tasks',
      message: 'What tasks do you want to run?',
      choices: TASK_LIST,
      default: TASK_LIST,
    },
  ])

  const tasks = await Promise.all(
    list.tasks.map<Promise<TaskFn>>(async (name) => {
      const task = await import(`./tasks/${name}`)
      return task[camelize(name)]
    }),
  )

  return tasks
}

const createTodoList = async (ctx: ListerCtx) => {
  const todoList: TodoItem[] = []
  const tasks = await generateTaskList()

  tasks.forEach((cfgFn) => {
    const cfg = cfgFn(ctx, tasks)
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

export const createTasks = async (ctx: ListerCtx) => {
  const todoList = await createTodoList(ctx)

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

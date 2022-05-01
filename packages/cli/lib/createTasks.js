'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.createTasks = void 0
const inquirer_1 = __importDefault(require('inquirer'))
const listr_1 = __importDefault(require('listr'))
const file_1 = require('./utils/file')
const generate_1 = require('./utils/generate')
const F_1 = require('./utils/F')
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
  const list = await inquirer_1.default.prompt([
    {
      type: 'checkbox',
      name: 'tasks',
      message: 'What tasks do you want to run?',
      choices: TASK_LIST,
      default: TASK_LIST,
    },
  ])
  const tasks = await Promise.all(
    list.tasks.map(async (name) => {
      const task = await Promise.resolve().then(() =>
        __importStar(require(`./tasks/${name}`)),
      )
      return task[(0, F_1.camelize)(name)]
    }),
  )
  return tasks
}
const createTodoList = async () => {
  const todoList = []
  const tasks = await generateTaskList()
  tasks.forEach((cfgFn) => {
    var _a
    const cfg = cfgFn()
    const name = cfg.name
    const predecessorTasks = cfg.predecessorTasks
    const installDepsList = cfg.toInstallDeps
    const removeFileList = cfg.toRemoveFiles
    const addFileList =
      (_a = cfg.toAddFiles) === null || _a === void 0
        ? void 0
        : _a.map((item) => ({
            path: (0, file_1.createRootPath)(item.name, item.path),
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
const createTasks = async () => {
  const todoList = await createTodoList()
  return new listr_1.default(
    todoList.map((todo) => {
      const { name, task } = todo
      return {
        title: `setting ${name}`,
        task: (ctx) => {
          return new listr_1.default(
            (0, generate_1.createListrTask)(name, task, ctx),
          )
        },
      }
    }),
  )
}
exports.createTasks = createTasks

'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.createTasks = void 0
const listr_1 = __importDefault(require('listr'))
const commilint_1 = require('./tasks/commilint')
const commitizen_1 = require('./tasks/commitizen')
const eslint_1 = require('./tasks/eslint')
const githooks_1 = require('./tasks/githooks')
const lint_staged_1 = require('./tasks/lint-staged')
const prettier_1 = require('./tasks/prettier')
const stylelint_1 = require('./tasks/stylelint')
const file_1 = require('./utils/file')
const generate_1 = require('./utils/generate')
const createTodoList = () => {
  const todoList = []
  ;[
    eslint_1.eslint,
    prettier_1.prettier,
    stylelint_1.stylelint,
    commilint_1.commitlint,
    lint_staged_1.lintStaged,
    commitizen_1.commitizen,
    githooks_1.gitHooks,
  ].forEach((cfgFn) => {
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
  const todoList = createTodoList()
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

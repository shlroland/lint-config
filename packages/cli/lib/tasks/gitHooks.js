'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.gitHooks = void 0
const process_1 = require('process')
const package_json_1 = __importDefault(
  require('@shlroland/git-hooks/package.json'),
)
const git_hooks_1 = __importDefault(require('@shlroland/git-hooks'))
const fs_extra_1 = __importDefault(require('fs-extra'))
const chalk_1 = __importDefault(require('chalk'))
const generate_1 = require('../utils/generate')
const file_1 = require('../utils/file')
const detect_1 = require('../utils/detect')
const gitHooks = () => {
  return {
    name: 'gitHooks',
    predecessorTasks: [
      async () => {
        if (!(0, detect_1.isGitSync)((0, process_1.cwd)())) {
          throw new Error(
            `You didn't init git in ${(0,
            process_1.cwd)()}, please init git first,then visit ${chalk_1.default.blue(
              'https://www.npmjs.com/package/git-hook-pure',
            )} to install git-hook-pure manually`,
          )
        }
      },
    ],
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    extraTasks: [
      async () => {
        const hooks = Object.entries(git_hooks_1.default.hooks)
        for (let i = 0; i < hooks.length; i++) {
          const [hookName, hook] = hooks[i]
          const hookDirPath = `.githooks/${hookName}`
          for (let j = 0; j < hook.length; j++) {
            const { name, content } = hook[j]
            const filePath = `${hookDirPath}/${name}.sh`
            await (0, file_1.createFile)(filePath, content)
            await fs_extra_1.default.chmod(filePath, 0o755)
          }
        }
      },
    ],
  }
}
exports.gitHooks = gitHooks

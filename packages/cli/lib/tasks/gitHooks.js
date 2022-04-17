'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.gitHooks = void 0
const package_json_1 = __importDefault(
  require('@shlroland/git-hooks/package.json'),
)
const git_hooks_1 = __importDefault(require('@shlroland/git-hooks'))
const fs_extra_1 = __importDefault(require('fs-extra'))
const generate_1 = require('../utils/generate')
const file_1 = require('../utils/file')
const gitHooks = () => {
  return {
    name: 'gitHooks',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    extraTasks: [
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          const hooks = Object.entries(git_hooks_1.default.hooks)
          for (let i = 0; i < hooks.length; i++) {
            const [hookName, hook] = hooks[i]
            const hookDirPath = `.githooks/${hookName}`
            for (let j = 0; j < hook.length; j++) {
              const { name, content } = hook[j]
              const filePath = `${hookDirPath}/${name}.sh`
              yield (0, file_1.createFile)(filePath, content)
              yield fs_extra_1.default.chmod(filePath, 0o755)
            }
          }
        }),
    ],
  }
}
exports.gitHooks = gitHooks

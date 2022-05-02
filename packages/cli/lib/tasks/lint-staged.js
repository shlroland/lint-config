'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.lintStaged = void 0
const package_json_1 = __importDefault(
  require('@shlroland/lint-staged/package.json'),
)
const generate_1 = require('../utils/generate')
const file_1 = require('../utils/file')
const lintStaged = () => {
  return {
    name: 'lint-staged',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)([
      '.lintstagedrc',
      'lint-staged.config',
    ]),
    toAddFiles: [
      {
        name: 'lint-staged.config.js',
        content: `module.exports = require('@shlroland/lint-staged')`,
      },
    ],
    extraTasks: [
      async () => {
        await (0, file_1.modifyPkg)((pkg) => {
          pkg.scripts['lint-staged'] = 'lint-staged'
          return pkg
        })
        await (0, generate_1.deletePropAboutPkg)('lint-staged')
      },
    ],
  }
}
exports.lintStaged = lintStaged

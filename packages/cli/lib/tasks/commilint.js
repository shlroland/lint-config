'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.commitlint = void 0
const package_json_1 = __importDefault(
  require('@shlroland/commitlint-config/package.json'),
)
const generate_1 = require('../utils/generate')
const commitlint = () => {
  return {
    name: 'commitlint',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)([
      '.commitlintrc',
      'commitlint.config',
    ]),
    toAddFiles: [
      {
        name: 'commitlint.config.js',
        content: `module.exports = require('@shlroland/commitlint-config')`,
      },
    ],
    extraTasks: [
      async () => {
        await (0, generate_1.deletePropAboutPkg)('commitlint')
      },
    ],
  }
}
exports.commitlint = commitlint

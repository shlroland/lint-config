'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.stylelint = void 0
const package_json_1 = __importDefault(
  require('@shlroland/stylelint-config/package.json'),
)
const generate_1 = require('../utils/generate')
const stylelint = () => {
  return {
    name: 'stylelint',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)([
      '.stylelintrc',
      'stylelint.config',
    ]),
    toAddFiles: [
      {
        name: 'stylelint.config.js',
        content: 'module.exports = require("@shlroland/stylelint-config")',
      },
    ],
    extraTasks: [
      async () => {
        await (0, generate_1.deletePropAboutPkg)('stylelint')
      },
    ],
  }
}
exports.stylelint = stylelint

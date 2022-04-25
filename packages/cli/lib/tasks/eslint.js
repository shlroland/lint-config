'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.eslint = void 0
const package_json_1 = __importDefault(
  require('@shlroland/eslint-config/package.json'),
)
const generate_1 = require('../utils/generate')
const eslint = () => {
  return {
    name: 'eslint',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)('.eslintrc'),
    toAddFiles: [
      {
        name: '.eslintrc.js',
        content: `module.exports = {extends: ['@shlroland']}`,
      },
    ],
    extraTasks: [
      async () => {
        await (0, generate_1.deletePropAboutPkg)('eslintConfig')
      },
    ],
  }
}
exports.eslint = eslint

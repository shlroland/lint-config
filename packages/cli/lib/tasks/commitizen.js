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
exports.commitizen = void 0
const package_json_1 = __importDefault(
  require('@shlroland/commitizen-config/package.json'),
)
const generate_1 = require('../utils/generate')
const commitizen = () => {
  return {
    name: 'commitizen',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)('.czrc'),
    toAddFiles: [
      {
        name: '.czrc',
        content: `{
            "path": "node_modules/cz-git",
            "useEmoji": true
          }`,
      },
    ],
    extraTasks: [
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          yield (0, generate_1.deletePropAboutPkg)('config.commitizen')
        }),
    ],
  }
}
exports.commitizen = commitizen

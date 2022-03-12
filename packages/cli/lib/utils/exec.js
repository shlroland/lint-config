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
exports.installDep = exports.exec = void 0
const execa_1 = __importDefault(require('execa'))
function exec(cmd, options = {}) {
  return __awaiter(this, void 0, void 0, function* () {
    const [shell, ...args] = cmd.split(' ')
    const child = yield (0, execa_1.default)(
      shell,
      args,
      Object.assign({}, options),
    )
    return child
  })
}
exports.exec = exec
const installDep = (dep) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return exec(`pnpm i -D ${dep}`)
  })
exports.installDep = installDep

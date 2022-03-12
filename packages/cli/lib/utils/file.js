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
exports.modifyPkg =
  exports.createRootPath =
  exports.createFile =
  exports.removeFile =
    void 0
const path_1 = __importDefault(require('path'))
const fs_extra_1 = __importDefault(require('fs-extra'))
const removeFile = (file) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const target = path_1.default.join(process.cwd(), file)
    return fs_extra_1.default.remove(target)
  })
exports.removeFile = removeFile
const createFile = (path, content) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fs_extra_1.default.outputFile(path, content)
  })
exports.createFile = createFile
const createRootPath = (name, specified) => {
  return path_1.default.join(
    specified !== null && specified !== void 0 ? specified : process.cwd(),
    name,
  )
}
exports.createRootPath = createRootPath
const modifyPkg = (cb) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const pkgPath = path_1.default.join(process.cwd(), 'package.json')
    const pkgStr = yield fs_extra_1.default.readFile(pkgPath, 'utf-8')
    const pkg = JSON.parse(pkgStr)
    const newPkg = cb(pkg)
    fs_extra_1.default.writeFile(pkgPath, JSON.stringify(newPkg))
  })
exports.modifyPkg = modifyPkg

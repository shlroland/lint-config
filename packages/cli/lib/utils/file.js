'use strict'
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
const removeFile = async (file) => {
  const target = path_1.default.join(process.cwd(), file)
  return fs_extra_1.default.remove(target)
}
exports.removeFile = removeFile
const createFile = async (path, content) => {
  return fs_extra_1.default.outputFile(path, content)
}
exports.createFile = createFile
const createRootPath = (name, specified) => {
  return path_1.default.join(
    specified !== null && specified !== void 0 ? specified : process.cwd(),
    name,
  )
}
exports.createRootPath = createRootPath
const modifyPkg = async (cb) => {
  const pkgPath = path_1.default.join(process.cwd(), 'package.json')
  const pkgStr = await fs_extra_1.default.readFile(pkgPath, 'utf-8')
  const pkg = JSON.parse(pkgStr)
  const newPkg = cb(pkg)
  fs_extra_1.default.writeFile(pkgPath, JSON.stringify(newPkg))
}
exports.modifyPkg = modifyPkg

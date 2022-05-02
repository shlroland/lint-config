'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.kebabize = exports.camelize = exports.BooleanT = void 0
const BooleanT = () => (a) => {
  return Boolean(a)
}
exports.BooleanT = BooleanT
const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase())
exports.camelize = camelize
const kebabize = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
  )
exports.kebabize = kebabize

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.cli = void 0
const commander_1 = require('commander')
const __1 = require('..')
const cli = () => {
  commander_1.program.version(process.env.npm_package_version)
  commander_1.program.command(`init`).action(__1.init)
  commander_1.program.parse()
}
exports.cli = cli

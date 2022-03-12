#!/usr/bin/env node
'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const commander_1 = require('commander')
const _1 = require('.')
commander_1.program.version(process.env.npm_package_version)
commander_1.program.command(`init`).action(_1.init)
commander_1.program.parse()

#!/usr/bin/env node
import { program } from 'commander'
import { init } from '.'

program.version(process.env.npm_package_version)
program.command(`init`).action(init)

program.parse()

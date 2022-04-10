import { program } from 'commander'
import { init } from '..'

export const cli = () => {
  program.version(process.env.npm_package_version)
  program.command(`init`).action(init)

  program.parse()
}

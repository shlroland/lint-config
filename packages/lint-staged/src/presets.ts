import { eslint, prettier, stylelint } from './atoms'
import { finish } from './operators'

export const js = eslint(prettier(finish))

export const css = prettier(stylelint(finish))

export const md = prettier(finish)

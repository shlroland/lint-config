import { eslint, prettier, stylelint } from './atoms'
import { finish } from './operators'

export const js = eslint(prettier(finish))

export const stylelintCSS = stylelint(finish)

export const prettierCSS = prettier(finish)

export const md = prettier(finish)

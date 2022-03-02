import { eslint, prettier } from './atoms'
import { finish } from './operators'

export const js = eslint(prettier(finish))

export const css = prettier(finish)

export const md = prettier(finish)

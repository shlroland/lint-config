import type { UserConfig } from 'cz-git'
import czgGitmoji from 'cz-git-gitmoji-prompts'

export const gitmojiConfig: UserConfig = {
  extends: ['czg-gitmoji'],
  prompt: czgGitmoji.prompt,
}

export default gitmojiConfig

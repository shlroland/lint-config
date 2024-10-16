import { initAnswerContext } from './answer/abstract/context'

initAnswerContext().then(() => {
  import('./cli')
})

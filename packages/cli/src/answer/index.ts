import type { AbstractAnswer } from './abstract/answer'
import * as p from '@clack/prompts'
import { onCancel } from '../utils'
import { CommitlintAnswer } from './commitlint'
import { EslintAnswer } from './eslint'
import { HuskyAnswer } from './husky'
import { LintStagedAnswer } from './lint-staged'

export const answers = [
  new EslintAnswer(),
  new LintStagedAnswer(),
  new CommitlintAnswer(),
  new HuskyAnswer(),
]

export const toSelectAnswers = new Map([
  [EslintAnswer.toolName, EslintAnswer],
  [LintStagedAnswer.toolName, LintStagedAnswer],
  [CommitlintAnswer.toolName, CommitlintAnswer],
  [HuskyAnswer.toolName, HuskyAnswer],
])

export async function getAnswers(): Promise<AbstractAnswer[]> {
  const answerKeys = Array.from(toSelectAnswers.keys())
  const options = answerKeys.map(answer => ({
    value: answer,
  }))

  const selectedAnswers = await p.multiselect({
    message: 'Please select lint tools to install:',
    options,
    initialValues: answerKeys,
  })

  if (p.isCancel(selectedAnswers)) {
    onCancel()
    return []
  }

  return selectedAnswers.map((answer) => {
    const AnswerCls = toSelectAnswers.get(answer)
    if (!AnswerCls) {
      throw new Error(`Answer ${answer} not found`)
    }
    return new AnswerCls()
  })
}

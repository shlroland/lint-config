import type { UserConfig } from 'cz-git'
import { formatGitmojiMessage } from './commitlint-config/gitmoji'

export const commitlintConfig: UserConfig = {
  extends: ['gitmoji'],
  rules: {
    'type-empty': [0, 'never'],
    'type-enum': [0],
  },
  prompt: {
    alias: { fd: 'docs: fix typos', uv: 'chore: update versions' },
    messages: {
      type: 'Select an emoji that represents a type of change that you\'re committing:',
      scope: 'Denote the SCOPE of this change (optional):',
      customScope: 'Denote the SCOPE of this change:',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking:
        'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixesSelect:
        'Select the ISSUES type of changeList by this change (optional):',
      customFooterPrefix: 'Input ISSUES prefix:',
      footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
      generatingByAI: 'Generating your AI commit subject...',
      generatedSelectByAI: 'Select suitable subject by AI generated:',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },
    types: [
      {
        // just for search
        value: 'features feat',
        name: '✨: Introduce new features',
        emoji: ':sparkles:',
      },
      {
        value: 'fix bug',
        name: '🐛: Fix a bug',
        emoji: ':bug:',
      },
      {
        value: 'wip',
        name: '🚧: Work in progress',
        emoji: ':construction:',
      },
      {
        value: 'refactor',
        name: '♻️: Refactor code',
        emoji: ':recycle:',
      },
      {
        value: 'docs documentation',
        name: '📝: Add or update documentation',
        emoji: ':memo:',
      },
      {
        value: 'hotfix',
        name: '🚑️: Critical hotfix',
        emoji: ':ambulance:',
      },
      {
        value: 'initial begin',
        name: '🎉: Begin a project',
        emoji: ':tada:',
      },
      {
        value: 'style formatting whitespace',
        name: '💄: Improve formatting, white-space',
        emoji: ':lipstick:',
      },
      {
        value: 'art structure format',
        name: '🎨: Improve structure / format of the code',
        emoji: ':art:',
      },
      {
        value: 'remove',
        name: '🔥: Remove code or files.',
        emoji: ':fire:',
      },
      {
        value: 'perf Improve',
        name: '⚡️: Improve performance',
        emoji: ':zap:',
      },
      {
        value: 'deploy',
        name: '🚀: Deploy stuff',
        emoji: ':rocket:',
      },
      {
        value: 'pass test',
        name: '✅: Add, update, or pass tests',
        emoji: ':white_check_mark:',
      },
      {
        value: 'security privacy',
        name: '🔒️: Fix security or privacy issues',
        emoji: ':lock:',
      },
      {
        value: 'secret',
        name: '🔐: Add or update secrets',
        emoji: ':closed_lock_with_key:',
      },
      {
        value: 'tag',
        name: '🔖: Release / Version tags',
        emoji: ':bookmark:',
      },
      {
        value: 'lint compiler warning',
        name: '🚨: Fix compiler / linter warnings.',
        emoji: ':rotating_light:',
      },
      {
        value: 'ci',
        name: '💚: Fix CI Build',
      },
      // {
      //   value: 'build',
      //   name: '👷: Add or update build scripts',
      //   emoji: ':construction:',
      // },

    ],
    useEmoji: true,
    emojiAlign: 'left',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [
      { value: 'closed', name: 'closed:   ISSUES has been processed' },
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
    formatMessageCB: ({ emoji, scope, subject, body, breaking, footer }) => {
      const header = `${emoji}${scope ? ` (${scope}):` : ''} ${subject}`
      return formatGitmojiMessage(header, body, breaking, footer)
    },
  },
}

export default commitlintConfig

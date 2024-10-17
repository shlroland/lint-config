import type { UserConfig } from 'cz-git'
import { formatGitmojiMessage } from './commitlint-config/gitmoji'

export const commitlintConfig: UserConfig = {
  extends: ['gitmoji'],
  rules: {
    'type-empty': [0, 'never'],
    'type-enum': [0],
  },
  prompt: {
    alias: { fd: '✏️: fix typos', uv: '🔖: update versions' },
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
        name: '🔥: Remove code or files',
        emoji: ':fire:',
      },
      {
        value: 'move rename',
        name: '🚚: Move or rename resources (e.g.: files, paths, routes)',
        emoji: ':truck:',
      },
      {
        value: 'perf Improve',
        name: '⚡️: Improve performance',
        emoji: ':zap:',
      },
      {
        value: 'initial begin',
        name: '🎉: Begin a project',
        emoji: ':tada:',
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
        name: '🚨: Fix compiler / linter warnings',
        emoji: ':rotating_light:',
      },
      {
        value: 'ci',
        name: '💚: Fix CI Build',
      },
      {
        value: 'upgrade dependencies',
        name: '⬆️: Upgrade dependencies',
        emoji: ':arrow_up:',
      },
      {
        value: 'downgrade dependencies',
        name: '⬇️: Downgrade dependencies',
        emoji: ':arrow_down:',
      },
      {
        value: 'pin dependencies',
        name: '📌: Pin dependencies to specific versions',
        emoji: ':pushpin:',
      },
      {
        value: 'add dependencies',
        name: '➕: Add dependencies',
        emoji: ':heavy_plus_sign:',
      },
      {
        value: 'remove dependencies',
        name: '➖: Remove dependencies',
        emoji: ':heavy_minus_sign:',
      },
      {
        value: 'ci',
        name: '👷: Add or update CI build system',
        emoji: ':construction:',
      },
      {
        value: 'config',
        name: '🔧: Add or update configuration files',
        emoji: ':wrench:',
      },
      {
        value: 'dev scripts',
        name: '🔨: Add or update development scripts',
        emoji: ':hammer:',
      },
      {
        value: 'i18n',
        name: '🌐: Internationalization and localization',
        emoji: ':globe_with_meridians:',
      },
      {
        value: 'typo',
        name: '✏️: Fix typos',
        emoji: ':pencil2:',
      },
      {
        value: 'bad wip',
        name: '💩: Write bad code that needs to be improved',
        emoji: ':poop:',
      },
      {
        value: 'rewind',
        name: '⏪️: Rewind changes',
        emoji: ':rewind:',
      },
      {
        value: 'merge',
        name: '🔀: Merge branches',
        emoji: ':twisted_rightwards_arrows:',
      },
      {
        value: 'package',
        name: '📦️: Add or update compiled files or packages',
        emoji: ':package:',
      },
      {
        value: 'external code',
        name: '👽️: Update code due to external API changes.',
        emoji: ':alien:',
      },
      {
        value: 'license',
        name: '📄: Add or update license',
        emoji: ':page_facing_up:',
      },
      {
        value: 'breaking',
        name: '💥: Introduce breaking changes',
        emoji: ':boom:',
      },
      {
        value: 'assets',
        name: '🍱: Add or update assets',
        emoji: ':bento:',
      },
      {
        value: 'accessibility a11y',
        name: '♿️: Improve accessibility',
        emoji: ':wheelchair:',
      },
      {
        value: 'comment',
        name: '💡: Add or update comments in source code',
        emoji: ':bulb:',
      },
      {
        value: 'drunken',
        name: '🍻: Write code drunkenly',
        emoji: ':beer:',
      },
      {
        value: 'literal',
        name: '💬: Add or update text and literals',
        emoji: ':speech_balloon:',
      },
      {
        value: 'database',
        name: '🗃️: Perform database related changes',
        emoji: ':card_file_box:',
      },
      {
        value: 'log add update',
        name: '🔊: Add or update logs',
        emoji: ':loud_sound:',
      },
      {
        value: 'log remove',
        name: '🔇: Remove logs',
        emoji: ':mute:',
      },
      {
        value: 'responsive',
        name: '📱: Work on responsive design',
        emoji: ':iphone:',
      },
      {
        value: 'mock',
        name: '🤡: Mock things',
        emoji: ':clown_face:',
      },
      {
        value: 'egg',
        name: '🥚: Add or update an easter egg',
        emoji: ':egg:',
      },
      {
        value: 'gitignore',
        name: '🙈: Add or update a .gitignore file',
        emoji: ':see_no_evil:',
      },
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

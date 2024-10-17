import type { UserConfig } from 'cz-git'
import { formatGitmojiMessage } from './utils'

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
      // --------------The most commonly used----------------
      ...[
        {
          value: 'feat',
          name: '✨: Introduce new features',
          emoji: ':sparkles:',
        },
        {
          value: 'fix bug',
          name: '🐛: Fix a bug',
          emoji: ':bug:',
        },
        {
          value: 'hotfix',
          name: '🚑️: Critical hotfix',
          emoji: ':ambulance:',
        },

        {
          value: 'docs documentation',
          name: '📝: Add or update documentation',
          emoji: ':memo:',
        },
        {
          value: 'refactor',
          name: '♻️: Refactor code',
          emoji: ':recycle:',
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
          value: 'wip',
          name: '🚧: Work in progress',
          emoji: ':construction:',
        },
        {
          value: 'breaking',
          name: '💥: Introduce breaking changes',
          emoji: ':boom:',
        },
      ],
      // --------------some changes(add or update) which will affect the logic of source code ----------------
      ...[
        {
          value: 'perf Improve',
          name: '⚡️: Improve performance',
          emoji: ':zap:',
        },
        {
          value: 'simple fix',
          name: '🩹: Simple fix for a non-critical issue',
          emoji: ':adhesive_bandage:',
        },
        {
          value: 'catch error',
          name: '🥅: Catch errors',
          emoji: ':goal_net:',
        },
        {
          value: 'external code',
          name: '👽️: Update code due to external API changes.',
          emoji: ':alien:',
        },
        {
          value: 'bad code',
          name: '💩: Write bad code that needs to be improved',
          emoji: ':poop:',
        },
        {
          value: 'drunken',
          name: '🍻: Write code drunkenly',
          emoji: ':beer:',
        },
        {
          value: 'business logic',
          name: '👔: Add or update business logic',
          emoji: ':necktie:',
        },
        {
          value: 'infrastructure',
          name: '🧱: Infrastructure related changes',
          emoji: ':building_construction:',
        },
        {
          value: 'architecture',
          name: '🏗️: Make architectural changes',
          emoji: ':building_construction:',
        },
        {
          value: 'auth',
          name: '🛂: Work on code related to authorization, roles and permissions',
          emoji: ':passport_control:',
        },
        {
          value: 'experiment',
          name: '⚗️: Perform experiments',
          emoji: ':alembic:',
        },
        {
          value: 'package',
          name: '📦️: Add or update compiled files or packages',
          emoji: ':package:',
        },
        {
          value: 'healthcheck',
          name: '🩺: Add or update healthcheck',
          emoji: ':stethoscope:',
        },
        {
          value: 'multithreading concurrency',
          name: '🧵: Add or update code related to multithreading or concurrency',
          emoji: ':thread:',
        },
        {
          value: 'validation',
          name: '🦺: Add or update code related to validation',
          emoji: ':wrench:',
        },
        {
          value: 'seed',
          name: '🌱: Add or update seed files',
          emoji: ':seedling:',
        },
        {
          value: 'database',
          name: '🗃️: Perform database related changes',
          emoji: ':card_file_box:',
        },
        {
          value: 'data',
          name: '🧐: Data exploration/inspection',
          emoji: ':monocle_face:',
        },
      ],
      // --------------some changes(add or update) which will not affect the logic of source code ----------------
      ...[
        {
          value: 'comment',
          name: '💡: Add or update comments in source code',
          emoji: ':bulb:',
        },
        {
          value: 'types',
          name: '🏷️: Add or update types',
          emoji: ':label:',
        },

        {
          value: 'config',
          name: '🔧: Add or update configuration files',
          emoji: ':wrench:',
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
          value: 'dev scripts',
          name: '🔨: Add or update development scripts',
          emoji: ':hammer:',
        },
        {
          value: 'license',
          name: '📄: Add or update license',
          emoji: ':page_facing_up:',
        },
        {
          value: 'typo',
          name: '✏️: Fix typos',
          emoji: ':pencil2:',
        },
        {
          value: 'assets',
          name: '🍱: Add or update assets',
          emoji: ':bento:',
        },
        {
          value: 'literal',
          name: '💬: Add or update text and literals',
          emoji: ':speech_balloon:',
        },
        {
          value: 'log add update',
          name: '🔊: Add or update logs',
          emoji: ':loud_sound:',
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
        {
          value: 'contributors',
          name: '👥: Add or update contributor(s)',
          emoji: ':busts_in_silhouette:',
        },
        {
          value: 'sponsorships',
          name: '💸: Add sponsorships or money related infrastructure',
          emoji: ':money_with_wings:',
        },
      ],
      // --------------some changes which is related to dependencies ----------------
      ...[
        {
          value: 'add dependencies',
          name: '➕: Add dependencies',
          emoji: ':heavy_plus_sign:',
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
          value: 'remove dependencies',
          name: '➖: Remove dependencies',
          emoji: ':heavy_minus_sign:',
        },
        {
          value: 'pin dependencies',
          name: '📌: Pin dependencies to specific versions',
          emoji: ':pushpin:',
        },
      ],
      // --------------some changes(remove) which will not affect the logic of source code ----------------
      ...[
        {
          value: 'log remove',
          name: '🔇: Remove logs',
          emoji: ':mute:',
        },
        {
          value: 'dead code',
          name: '⚰️: Remove dead code',
          emoji: ':coffin:',
        },
        {
          value: 'cleanup',
          name: '🗑️: Deprecate code that needs to be cleaned up',
          emoji: ':wastebasket:',
        },
      ],
      // --------------some changes which are related to beautify code ----------------
      ...[
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
          value: 'lint compiler warning',
          name: '🚨: Fix compiler / linter warnings',
          emoji: ':rotating_light:',
        },
        {
          value: 'feature flag',
          name: '🚩: Add, update, or remove feature flags',
          emoji: ':triangular_flag_on_post:',
        },
      ],
      // --------------some change which are related to CI/CD ----------------
      ...[
        {
          value: 'ci',
          name: '👷: Add or update CI build system',
          emoji: ':construction:',
        },
        {
          value: 'deploy',
          name: '🚀: Deploy stuff',
          emoji: ':rocket:',
        },
        {
          value: 'ci',
          name: '💚: Fix CI Build',
        },
      ],
      // --------------some changes which are related to UI/UX ----------------
      ...[
        {
          value: 'ux',
          name: '🚸: Improve user experience / usability',
          emoji: ':children_crossing:',
        },
        {
          value: 'i18n',
          name: '🌐: Internationalization and localization',
          emoji: ':globe_with_meridians:',
        },

        {
          value: 'accessibility a11y',
          name: '♿️: Improve accessibility',
          emoji: ':wheelchair:',
        },
        {
          value: 'responsive',
          name: '📱: Work on responsive design',
          emoji: ':iphone:',
        },
        {
          value: 'seo',
          name: '🔍: Improve SEO',
          emoji: ':mag:',
        },
        {
          value: 'animation',
          name: '💫: Add or update animations and transitions',
          emoji: ':dizzy:',
        },
        {
          value: 'developer experience',
          name: '🧑‍💻: Improve developer experience',
          emoji: ':technologist:',
        },
      ],
      // --------------some change which are related to test ----------------
      ...[
        {
          value: 'pass test',
          name: '✅: Add, update, or pass tests',
          emoji: ':white_check_mark:',
        },
        {
          value: 'snapshot',
          name: '📸: Add or update snapshots',
          emoji: ':camera_flash:',
        },
        {
          value: 'failing test',
          name: '🧪: Add a failing test',
          emoji: ':test_tube:',
        },
      ],
      // --------------some changes which are related to git operation ----------------
      ...[
        {
          value: 'initial begin',
          name: '🎉: Begin a project',
          emoji: ':tada:',
        },
        {
          value: 'revert',
          name: '⏪️: Revert changes',
          emoji: ':rewind:',
        },
        {
          value: 'merge',
          name: '🔀: Merge branches',
          emoji: ':twisted_rightwards_arrows:',
        },
        {
          value: 'tag',
          name: '🔖: Release / Version tags',
          emoji: ':bookmark:',
        },
      ],
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
    allowBreakingChanges: undefined,
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

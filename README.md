# @shlroland/lint-config

## setting lint config will be easy and fast

a collection of

- eslint
- prettier
- stylelint
- commitlint
- commitizen
- lint-staged
- husky

## Usage

### Automatic Setup

```bash
pnpm create @shlroland/lint-config-cli init
```

> 😅 there are some errors when using npm and yarn, it will be fixed

> 🚨 this command will override your current configuration in your config file or `package.json`

### Manual Setup

> 😢 the cli mode is developing , please install packages manually

#### eslint

install

```bash
pnpm add -D eslint @shlroland/eslint-config
```

or you can install subpackage

- `@shlroland/eslint-config-basic`
- `@shlroland/eslint-config-ts`
- `@shlroland/eslint-config-vue`
- `@shlroland/eslint-config-react`
- `@shlroland/eslint-config-prettier`

config
create `.eslintrc.js`

```js
module.exports = { extends: ['@shlroland'] }
```

#### prettier

install

```bash
pnpm add -D prettier @shlroland/prettier-config
```

config
create `prettier.config.js`

```js
module.exports = require('@shlroland/prettier-config')
```

#### stylelint

install

```bash
pnpm add -D stylelint stylelint-config-prettier stylelint-config-standard stylelint-order @shlroland/stylelint-config
```

config
create `stylelint.config.js`

```js
module.exports = require('@shlroland/stylelint-config')
```

#### commitlint

install

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional @shlroland/commitlint-config
```

config
create `commitlint.config.js`

```js
module.exports = require('@shlroland/commitlint-config')
```

#### commitizen

install

```bash
pnpm add -D commitizen cz-git @shlroland/commitizen-config
```

config
create `.czrc`

```json
{
  "path": "node_modules/cz-git",
  "useEmoji": true
}
```

#### lint-staged

install

```bash
pnpm add -D lint-staged @shlroland/lint-staged
```

config
create `lint-staged.config.js`

```js
module.exports = require('@shlroland/lint-staged')
```

#### husky

install

```bash
pnpm add -D husky
```

```bash
pnpm husky install

pnpm husky add .husky/commit-msg "pnpm commitlint -E HUSKY_GIT_PARAMS"

pnpm husky add .husky/pre-commit "pnpm lint-staged"
```

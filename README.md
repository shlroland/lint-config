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

> Certainly, you can also use `yarn` or `npm`

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
module.exports = require('@shlroland/lint-staged')()
```

> if you want use `stylelint` to lint stylesheets , please give a true param

#### git-hooks-pure

you visit [git-hook-pure](https://www.npmjs.com/package/git-hook-pure) to install

Inspired by

- [@c4605/toolconfs](https://www.npmjs.com/package/@c4605/toolconfs)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [@fantasticit/code-lint](https://github.com/fantasticit/code-lint)

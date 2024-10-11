# @shlroland/lint-config

## setting lint config will be easy and fast

a collection of

- eslint
- cz(czg) + commitlint
- lint-staged
- husky
- prettier

## Usage

### Wizard Setup

execute the following command in your terminal, the lint tools will be installed and configured automatically.

```bash
pnpm dlx @shlroland/lint-cli
```

### Manual Setup

#### eslint

`@shlroland/eslint-config` is based on [`@antfu/eslint-config`][antfu-eslint-config] and extends some rules.

##### install

```bash
pnpm add -D eslint @shlroland/eslint-config eslint-plugin-format
```

##### config

create `eslint.config.js`

```js
// for "type": "module"
import { shlroland } from '@shlroland/eslint-config'
export default shlroland()
```

```js
// for "type": "commonjs"
const { shlroland } = require('@shlroland/eslint-config')
module.exports = shlroland()
```

#### cz(czg) + commitlint

use [`czg`](https://cz-git.qbb.sh/) to generate commit messages. And use [`commitlint`](https://commitlint.js.org/) to lint commit messages.

##### install

```bash
pnpm add -D @commitlint/cli czg @shlroland/cz-config
```

##### config

create `commitlint.config.js`

```js
// for "type": "module"
import { config } from '@shlroland/cz-config/commitlint'
export default config

// for "type": "commonjs"
module.exports = require('@shlroland/cz-config')
```

#### lint-staged

##### install

```bash
pnpm add -D lint-staged @shlroland/lint-staged
```

##### config

create `lint-staged.config.js`

```js
// for "type": "module"
import config from '@shlroland/lint-staged'
export default config

// for "type": "commonjs"
module.exports = require('@shlroland/lint-staged')
```

#### prettier(not recommended)

> it is not recommended use `prettier` to format code, since following the philosophy of [`@antfu/eslint-config`][antfu-eslint-config].

##### install

```bash
pnpm add -D prettier @shlroland/prettier-config
```

##### config

create `prettier.config.js`

```js
// for "type": "module"
import config from '@shlroland/prettier-config'
export default config

// for "type": "commonjs"
module.exports = require('@shlroland/prettier-config')
```

Inspired by

- [@c4605/toolconfs](https://www.npmjs.com/package/@c4605/toolconfs)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [@fantasticit/code-lint](https://github.com/fantasticit/code-lint)

[antfu-eslint-config]: https://github.com/antfu/eslint-config

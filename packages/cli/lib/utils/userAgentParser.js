'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.parseUserAgent = void 0
const semver_1 = __importDefault(require('semver'))
const partition = (array, predicate) =>
  array.reduce(
    ([left, right], item) =>
      predicate(item) ? [[...left, item], right] : [left, [...right, item]],
    [[], []],
  )
const parseUserAgent = (userAgent) => {
  const parts = userAgent.split(' ')
  const [engines, os] = partition(parts, (part) => part.includes('/'))
  const [platform, arch] = os
  const parsedEngines = engines
    .map((engine) => engine.split('/'))
    .reduce(
      (state, [name, version]) => ({
        ...state,
        [name]: semver_1.default.coerce(version),
      }),
      {},
    )
  return {
    ...parsedEngines,
    platform,
    arch,
    raw: userAgent,
  }
}
exports.parseUserAgent = parseUserAgent

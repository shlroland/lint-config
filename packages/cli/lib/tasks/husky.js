import pkg from '@shlroland/husky-config/package.json'
import { createDepsNameWithVersion } from '../utils/generate'
export const husky = () => {
  return {
    name: 'husky',
    toInstallDeps: [...createDepsNameWithVersion(pkg)],
  }
}

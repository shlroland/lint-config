import pkg from '@shlroland/commitizen-config/package.json'
import {
  createDepsNameWithVersion,
  jointConfigurationExt,
} from '../utils/generate'
export const commitizen = () => {
  return {
    name: 'commitizen',
    toInstallDeps: [...createDepsNameWithVersion(pkg)],
    toRemoveFiles: jointConfigurationExt('.czrc'),
    toAddFiles: [
      {
        name: '.czrc',
        content: `{
            "path": "node_modules/cz-git",
            "useEmoji": true
          }`,
      },
    ],
  }
}

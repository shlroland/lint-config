#!/usr/bin/env bash
projectRoot=`git rev-parse --show-toplevel`
hookName=`basename "$0"`
gitParams="$*"

executeAllFiles() {
  local hookFolderPath="$1"
  local hookFilePath

  for f in `ls -1 "$hookFolderPath"`; do
    hookFilePath="$hookFolderPath"/"$f"
    if  [ ! -d "$hookFilePath" ]; then
      if [ -x "$hookFilePath" ]; then
        shift 2
        "$hookFilePath" "$@" || exit 1
      else
        echo "==============================================="
        echo "WARNING: File $hookFilePath not executable"
        echo "==============================================="
      fi
    fi
  done
}

hookFolderPath="$projectRoot"/.githooks
if [ -d "$hookFolderPath" ]; then
  executeAllFiles "$hookFolderPath" "$hookName" "$@"
fi
if [ -d "$hookFolderPath"/"$hookName" ]; then
  executeAllFiles "$hookFolderPath"/"$hookName" "$@"
fi

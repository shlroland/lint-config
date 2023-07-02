#!/bin/bash

_GIT_HOOK_PURE_RUN_ENV=test source git-hook-pure.sh

inputFiles=(`ls -1 tests/clean-code-fixtures/hook* | grep -v '\-result$'`)
tempFile=`mktemp -u git-hook-pure-test.XXXXXX`
allTestPassed=true

for f in $inputFiles; do
  cp -f $f $tempFile
  cleanCode $tempFile
  if [ "`cat $tempFile`" != "`cat \"$f-result\"`" ]; then
    allTestPassed=false
    echo "ERROR: file $tempFile not match $inputFiles-result"
    break
  fi
done

rm -f $tempFile

if ! $allTestPassed; then
  echo "[test-clean-code.sh] test failed" >&2
  exit 1
fi

echo "[test-clean-code.sh] test passed"

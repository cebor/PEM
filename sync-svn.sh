#!/bin/bash
cd "$(dirname "$0")"

SVN="../html5/"

rsync \
  --exclude "$(basename "$0")" \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "dist" \
  --exclude ".tmp" \
  --exclude ".sass-cache" \
  --exclude "app/bower_components" \
  --delete \
  -avP . $SVN

cd $SVN

git add --all .
git ci -am "git sync"

git svn dcommit


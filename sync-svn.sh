#!/bin/bash
cd "$(dirname "$0")"

SVN="../html5/"

rsync \
  --exclude "$(basename "$0")" \
  --exclude ".git" \
  --exclude ".gitignore" \
  --exclude "node_modules" \
  --exclude ".tmp" \
  --exclude "bower_components" \
  --exclude "deploy.sh" \
  --delete \
  -avP . $SVN

cd $SVN

git add --all .
git ci -am "git sync"

git svn dcommit  --rmdir

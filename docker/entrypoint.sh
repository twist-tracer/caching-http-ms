#!/usr/bin/env sh

set -e

yarn install

if [ "$NODE_ENV" != 'production' ]
then
  exec ./node_modules/.bin/nodemon --exec node "$@";
else
  exec node "$@";
fi



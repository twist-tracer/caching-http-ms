#!/bin/sh

set -e

yarn install

# Run command with node if the first argument contains a "-" or is not a system command. The last
# part inside the "{}" is a workaround for the following bug in ash/dash:
# https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=874264
if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ] || { [ -f "${1}" ] && ! [ -x "${1}" ]; }; then
  if [ "$NODE_ENV" != 'production' ]
  then
    set -- npx nodemon --exec node --import "./ts-node-loader.js" "$@";
  else
    set -- node --import "./ts-node-loader.js" "$@"
  fi
fi

exec "$@";

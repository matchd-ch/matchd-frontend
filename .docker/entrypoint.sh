#!/bin/sh

set -eux

JSON_STRING='window.configs = { \
  "BASE_URL":"'"${BASE_URL:-/}"'", \
  "VUE_APP_API":"'"${VUE_APP_API}"'", \
  "NODE_ENV":"'"${NODE_ENV}"'", \
  "VUE_APP_DATA_PROTECTION_URL":"'"${VUE_APP_DATA_PROTECTION_URL}"'" \
}'

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/index.html

exec "$@"
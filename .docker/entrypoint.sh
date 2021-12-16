#!/bin/sh

set -eux

JSON_STRING='{ \
  "BASE_URL":"'"${BASE_URL-}"'", \
  "VUE_APP_API_URL":"'"${VUE_APP_API_URL-}"'", \
  "NODE_ENV":"'"${NODE_ENV-}"'", \
  "VUE_APP_DATA_PROTECTION_URL":"'"${VUE_APP_DATA_PROTECTION_URL-}"'" \
}'

JSON_STRING_CLEANED="$(echo "${JSON_STRING}" | tr -d '[:space:]')"

sed -i "s@// RUNTIME_CONFIGURATION@${JSON_STRING_CLEANED}@" /usr/share/nginx/html/index.html

exec "$@"
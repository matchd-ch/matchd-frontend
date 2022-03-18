#!/bin/sh

set -eux

JSON_STRING='{ \
  "BASE_URL":"'"${BASE_URL-}"'", \
  "API_URL":"'"${API_URL-}"'", \
  "NODE_ENV":"'"${NODE_ENV-}"'", \
  "DATA_PROTECTION_URL":"'"${DATA_PROTECTION_URL-}"'", \
  "GTM_ENABLED":"'"${GTM_ENABLED-}"'", \
  "GTM_DEBUG":"'"${GTM_DEBUG-}"'", \
  "GTM_CONTAINER_ID":"'"${GTM_CONTAINER_ID-}"'", \
  "SENTRY_DSN":"'"${SENTRY_DSN-}"'", \
  "SENTRY_ENVIRONMENT":"'"${SENTRY_ENVIRONMENT-}"'", \
  "SENTRY_RELEASE":"'"${SENTRY_RELEASE-}"'" \
}'

JSON_STRING_CLEANED="$(echo "${JSON_STRING}" | tr -d '[:space:]')"

if [ "${JSON_STRING_CLEANED#*^}" != "$JSON_STRING_CLEANED" ]; then
  echo '"^" character detected in config, this is not supported right now'
  exit 1
fi

sed -i "s^// RUNTIME_CONFIGURATION^${JSON_STRING_CLEANED}^" /usr/share/nginx/html/index.html

exec "$@"
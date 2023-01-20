#!/bin/sh

set -eux

JSON_STRING='{}'

VARIABLES="$(env \
  | grep -E "^((VITE|VUE)_APP_|NODE_ENV$)" \
  | awk '{sub(/=/," ")}1'
)"

while read -r VARIABLE_NAME VARIABLE_VALUE; do
  JSON_STRING="$(echo "$JSON_STRING" | jq --arg key "$VARIABLE_NAME" --arg value "$VARIABLE_VALUE" '.[$key]=$value')"
done << EOF
$VARIABLES
EOF

JSON_STRING_CLEANED="$(echo "${JSON_STRING}" | tr -d '[:space:]')"

if [ "${JSON_STRING_CLEANED#*^}" != "$JSON_STRING_CLEANED" ]; then
  echo '"^" character detected in config, this is not supported right now'
  exit 1
fi

sed -i "s^// RUNTIME_CONFIGURATION^${JSON_STRING_CLEANED}^" /usr/share/nginx/html/index.html

exec "$@"
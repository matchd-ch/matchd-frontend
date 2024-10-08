FROM nginx:1.27.2-alpine

RUN apk add --no-cache jq

ENV NODE_ENV=production

COPY .docker/entrypoint.sh /
COPY .docker/nginx/ /etc/nginx/
COPY dist /usr/share/nginx/html

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx"]
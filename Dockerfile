FROM nginx:1.21.4-alpine

ENV  NODE_ENV=production

COPY .docker/entrypoint.sh /
COPY .docker/nginx/ /etc/nginx/
COPY dist /usr/share/nginx/html

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx"]
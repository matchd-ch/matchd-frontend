FROM centos/nodejs-12-centos7
USER 0

COPY dist dist
COPY package.json package.json
COPY package-lock.json package-lock.json

USER 1001
RUN PATH=/opt/rh/rh-nodejs12/root/usr/bin/:${PATH} && npm install --production
EXPOSE 8080
CMD $STI_SCRIPTS_PATH/run

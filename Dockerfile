FROM node:18-alpine3.17

USER root

WORKDIR /home/app

COPY index.js /home/app/
COPY ./src /home/app/
COPY package.json /home/app/
COPY serverless.yml /home/app/

RUN npm install

# Debug container
# CMD tail -f /dev/null

CMD npm run local

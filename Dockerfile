# specify the node base image with your desired version
FROM node:18-alpine

# Install PM2 globally
RUN npm install -g pm2

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json .
COPY ecosystem.config.json .
COPY package.json yarn.lock ./
RUN rm yarn.lock
RUN apk add --no-cache git openssh python3 make g++

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.json"]
FROM node:16-alpine3.11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run test
RUN npm run build

CMD ["npm", "start"]
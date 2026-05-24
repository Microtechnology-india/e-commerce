FROM node:22-alpine

WORKDIR /usr/src/notification

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

CMD ["node", "server.js"]

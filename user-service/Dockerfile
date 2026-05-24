FROM node:22-alpine

WORKDIR /usr/src/user

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["node", "server.js"]

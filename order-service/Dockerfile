FROM node:22-alpine

WORKDIR /usr/src/order

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4002

CMD ["node", "server.js"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]

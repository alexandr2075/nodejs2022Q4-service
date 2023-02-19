FROM node:18.12-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g npm@9.5.0
COPY . .
EXPOSE 4000
CMD ["npm", "start:dev", "--legacy-peer-deps"]
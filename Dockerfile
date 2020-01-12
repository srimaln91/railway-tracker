FROM node:alpine
WORKDIR /usr/railway-tracker
COPY package.json .
COPY . .
RUN npm install
RUN npm build
EXPOSE 8080
CMD ["node", "./dist/app.js"]

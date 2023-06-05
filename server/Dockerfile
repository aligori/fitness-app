#https://www.geeksforgeeks.org/how-to-dockerize-an-expressjs-app/
FROM node:18-alpine as builder

ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "run", "start-dev" ]

EXPOSE 5000
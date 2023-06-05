# https://www.knowledgehut.com/blog/web-development/how-to-dockerize-react-app
FROM node:18-alpine as builder
# Define working directory
WORKDIR /frontend
# Copy dependencies
COPY package.json .
# Install all the dependencies
RUN yarn install
# Copy rest of content to workdir
COPY . .
# Build
RUN yarn build
# Expose port
EXPOSE 3000
CMD ["yarn", "start"]
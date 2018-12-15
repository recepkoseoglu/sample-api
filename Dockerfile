
FROM node:9.11.1-alpine

ADD /api /App
WORKDIR /App
RUN npm install

EXPOSE 3000
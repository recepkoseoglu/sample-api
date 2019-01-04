
FROM node:9.11.1-alpine

ADD . /App
WORKDIR /App
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]

FROM node:16.16.0-alpine3.15 AS development

WORKDIR /app

RUN apk update && apk add netcat-openbsd

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN ["chmod", "+x", "/app/entrypoint.sh"]

ENTRYPOINT ["sh", "/app/entrypoint.sh"]

FROM node:10

WORKDIR /app

RUN apt update -y && apt upgrade -y

COPY package.json /app/

COPY . .

EXPOSE 3000

RUN npm install

RUN npm install nodemon -g

CMD [ "nodemon", "/app/app.js" ]

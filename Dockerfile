FROM node

WORKDIR /app

RUN apt update -y && apt upgrade -y

COPY . .

#COPY package.json /app/

RUN npm install nodemon -g

RUN npm install


EXPOSE 3000

CMD [ "nodemon", "/app/app.js" ]

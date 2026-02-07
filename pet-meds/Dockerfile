FROM golang:tip-trixie

RUN apt-get update && apt-get install -y npm && apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY Server/go.mod Server/go.sum ./Server/
WORKDIR /app/Server
RUN go mod download

WORKDIR /app

COPY . .

ARG WEBSERVER_IP=localhost
ARG WEBSERVER_PORT=80
ARG WEBSERVER_DEV_PORT=8080
ENV WEBSERVER_IP=$WEBSERVER_IP
ENV WEBSERVER_PORT=$WEBSERVER_PORT
ENV WEBSERVER_DEV_PORT=$WEBSERVER_DEV_PORT

RUN npm run build

WORKDIR /app/Server
RUN go build -v -o server

EXPOSE 80

CMD [ "./server" ]
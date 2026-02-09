FROM golang:alpine3.22@sha256:20c8a94b529a9a127b6990c5e03537bd71ce3ebfdd744741e96168ac338bd862

WORKDIR /app/Server

COPY db/initial.db /app/Server/db/my.db

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -v -o server

EXPOSE 80

CMD [ "./server" ]
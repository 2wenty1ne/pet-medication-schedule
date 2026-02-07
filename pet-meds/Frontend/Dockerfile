FROM node:25-slim@sha256:3746b7c78e343062cbad1a1a9f22e582e2aaeda5b183b7050b5831e22f988730

WORKDIR /app/Frontend

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
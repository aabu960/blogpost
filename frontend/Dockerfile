# Build phase
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production phase
FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

# Serve via standard Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

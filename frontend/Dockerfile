FROM node:20-alpine AS builder

WORKDIR /vodkandApp

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build



FROM nginx:alpine

COPY --from=builder /vodkandApp/dist /usr/share/nginx/html

RUN sed -i 's/index  index.html index.htm;/try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
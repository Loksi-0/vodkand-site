FROM node:20-alpine AS builder

WORKDIR /vodkandApp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



FROM node:20-alpine AS runner
WORKDIR /vodkandApp

COPY --from=builder /vodkandApp/dist ./dist
COPY --from=builder /vodkandApp/package*.json ./
COPY --from=builder /vodkandApp/node_modules ./node_modules

EXPOSE 5000
CMD ["node", "dist/index.js"]
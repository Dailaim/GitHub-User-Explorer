# Primera fase (Builder)
FROM node:18 AS builder

WORKDIR /app/frontend/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package*.json ./
COPY --from=builder /app/frontend/dist ./dist
COPY --from=builder /app/frontend/vite.config.ts ./vite.config.ts

EXPOSE 3000

CMD [ "npm", "start" ]

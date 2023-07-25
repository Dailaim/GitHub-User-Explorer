
FROM node:18 AS builder


WORKDIR /app/back


COPY package*.json ./
COPY ./prisma ./prisma


RUN npm install
RUN npx prisma generate


COPY . .


RUN npm run build


FROM node:18

WORKDIR /usr/src/app

COPY --from=builder /app/back/node_modules ./node_modules
COPY --from=builder /app/back/package*.json ./
COPY --from=builder /app/back/dist ./dist

EXPOSE 4000

CMD [ "npm", "start" ]



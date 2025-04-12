FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY tsconfig.json tsconfig.build.json ./

COPY src /app/src

RUN npx prisma generate --schema=/app/src/prisma/schema.prisma  

RUN yarn build  

FROM node:20-alpine  

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules  
COPY --from=builder /app/dist ./dist  
COPY --from=builder /app/src/prisma ./prisma
COPY --from=builder /app/package.json ./  
COPY --from=builder /app/yarn.lock ./  

EXPOSE 300

CMD ["node", "dist/src/main"]
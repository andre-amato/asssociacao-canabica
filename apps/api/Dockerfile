FROM node:22-alpine AS build
WORKDIR /app
COPY apps/api/package.json ./
RUN npm install
COPY apps/api/ .
RUN npx prisma generate && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/generated ./src/generated
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/package.json ./
EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]

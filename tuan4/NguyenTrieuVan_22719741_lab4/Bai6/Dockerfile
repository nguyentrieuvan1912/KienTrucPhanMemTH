FROM node:18 AS builder
WORKDIR /build
COPY app.js .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /build/app.js .
CMD ["node", "app.js"]
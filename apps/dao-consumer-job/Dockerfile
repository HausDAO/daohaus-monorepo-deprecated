# Production image, copy all the files and run nest
FROM node:16-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S express -u 1001
COPY --chown=express:nodejs dist/apps/dao-consumer-job .
RUN npm install
USER express
EXPOSE 80
ENV PORT 80
CMD ["dumb-init", "node", "main.js"]

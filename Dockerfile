FROM node:18-alpine as base
ENV APP_DIR /app
WORKDIR $APP_DIR
RUN apk add bash vim
COPY package*.json tsconfig*.json $APP_DIR/
RUN npm ci && npm cache clean --force

FROM base as copy
COPY prisma $APP_DIR/prisma
COPY .env $APP_DIR/
COPY test $APP_DIR/test
COPY src $APP_DIR/src

FROM copy as dev
RUN npx prisma generate
ENTRYPOINT ["npm", "run", "start:dev"]

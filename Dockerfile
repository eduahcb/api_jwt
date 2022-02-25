FROM node:16.13.1

# CREATING WORKDIR
WORKDIR /api_jwt

COPY . /api_jwt/

# INSTALL DEPENDENCES
RUN yarn install

# ENV NODE_ENV development
# ENV PORT 8080

# ENV TYPEORM_CONNECTION = postgres
# ENV TYPEORM_HOST = api_jwt_postgres
# ENV TYPEORM_PORT = 5432
# ENV TYPEORM_USERNAME = postgres
# ENV TYPEORM_PASSWORD = 123
# ENV TYPEORM_DATABASE = api_jwt_dev
# ENV TYPEORM_MIGRATIONS = build/database/migrations/*.js
# ENV TYPEORM_ENTITIES = build/components/**/*.entity.js

# ONLY IN PRODUCTION
#ENV JWT_SECRET_KEY
#ENV ROLLBAR_ACCESS_TOKEN

RUN yarn build

# ENTRYPOINT [ "yarn", "start" ]

EXPOSE 8080

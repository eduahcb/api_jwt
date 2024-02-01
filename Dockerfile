# BUILD STAGE 
FROM node:16.13.1-alpine AS apibuild

# CREATING WORKDIR
WORKDIR /api_jwt

COPY package.json /api_jwt/
COPY yarn.lock /api_jwt/
COPY development.sh /api_jwt/
COPY tsconfig.json /api_jwt/
COPY src /api_jwt/src/
COPY @types /api_jwt/@types


# INSTALL DEPENDENCES
RUN yarn install

# CREATE BUILD
RUN yarn build


# PROD STAGE
FROM node:16.13.1-alpine

WORKDIR /api_jwt
COPY package.json /api_jwt
COPY yarn.lock /api_jwt
COPY development.sh /api_jwt
COPY --from=apibuild /api_jwt/build ./build

# ENV NODE_ENV=staging
# ENV PORT=8080

# ENV TYPEORM_CONNECTION=postgres
# ENV TYPEORM_HOST=api_jwt_postgres
# ENV TYPEORM_PORT=5432
# ENV TYPEORM_USERNAME=postgres
# ENV TYPEORM_PASSWORD=123
# ENV TYPEORM_DATABASE=api_jwt_dev
# ENV TYPEORM_MIGRATIONS=build/database/migrations/*.js
# ENV TYPEORM_ENTITIES=build/components/**/*.entity.js
# ENV REDIS_HOST=api_jwt_redis

# ONLY IN PRODUCTION
#ENV JWT_SECRET_KEY
#ENV ROLLBAR_ACCESS_TOKEN

RUN yarn install
RUN chmod +x development.sh

ENTRYPOINT ["/bin/sh", "./development.sh"]

EXPOSE 8080

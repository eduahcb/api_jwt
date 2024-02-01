FROM node:16.13.1-alpine AS base

# INSTALL dependencies
FROM base AS dependencies

# CREATING WORKDIR
WORKDIR /api_jwt

COPY package.json yarn.lock development.sh tsconfig.json /api_jwt/
COPY src /api_jwt/src
COPY @types /api_jwt/@types

RUN yarn install --frozen-lockfile --cache-folder=/api_jwt/.cache
RUN yarn build

# RUN BUILD APPLICATION
FROM base AS application

WORKDIR /api_jwt
COPY --from=dependencies /api_jwt/build ./build
COPY --from=dependencies /api_jwt/development.sh .
COPY --from=dependencies /api_jwt/node_modules ./node_modules

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

RUN chmod +x development.sh

ENTRYPOINT ["node", "build/server.js"]
EXPOSE 8080

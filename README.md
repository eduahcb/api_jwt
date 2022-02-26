<h1 align="center">API JWT</h1>

<h2  align="center">API to learn some techs</h2>

<p align="center" style="font-size: 18px;">
  <a href="#project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#techs">Techs</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


<div align="center" display="inline-block" margin="50px">
  <div display="inline-block;">

   ![CircleCI](https://img.shields.io/circleci/build/github/eduahcb/api_jwt?style=for-the-badge)
  
  </div>


  <div display="inline-block" style="margin: 0 10px;">

   ![Codecov](https://img.shields.io/codecov/c/github/eduahcb/api_jwt?style=for-the-badge)
  
  </div>

  <div display="inline-block" style="margin: 0 10px;">

   ![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/eduahcb/api_jwt?style=for-the-badge)

  </div>
</div>

# Project

## Preview

<p align="center">
<img src=".github/api_jwt.gif" />
</p>


## Structure

```sh

  ├── .circleci
  ├── build 
  ├── coverage
  ├── src
│   ├── components
│   │   ├── login
│   │   ├── logout
│   │   └── user
│   ├── config
│   │   ├── constants
│   │   └── redis
│   ├── database
│   │   └── migrations
│   ├── environments
│   ├── exceptions
│   ├── handlers
│   ├── helpers
│   ├── middlewares
│   └── utils

```

- .circleci: CI configuration

- build:  the build files

- coverage: test coverage

- src: application source

- src/components: the project separates by components each component has its route, controller, test and others in the same directory

- src/config: application config (redis, database, etc)

- src/database: the migrations files

- src/environments: the variable settings for each environment (development, test, production)

- src/exceptions: the application custom exceptions

- src/handlers: handlers files

- src/helpers: files with some methods to help

- src/middlewares: application middlewares

- src/utils: utility functions or class

# Techs

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Circle Ci](https://circleci.com/)
- [Docker](https://www.docker.com/)
- [Code Climate](https://codeclimate.com/)
- [Code Cov](https://about.codecov.io/)


# How to Use

## Clone the repository

 ```sh
 
  git clone https://github.com/eduahcb/api_jwt.git

  cd api_jwt
 
 ```

### Install Dependencies

  ```sh
   
    yarn install

  ```

### Run development mode

  Before you run this command you need to create a .env file like .env.example. You can
  choose the connection (mysql, postgres, mssql), host, etc, then you need to run the migrations:

  ```sh

    yarn typeorm migration:run

  ``` 

   ```sh

    yarn dev

   ```

### Run with docker

  ```sh

  docker-compose up -d

  ```

### BaseUrl Ports and API documentation

  ```
    baseUrl: "/api/v1"
    
    port: "localhost:8080"
    
    api documentation: "/api/v1/doc"
  ```
### Tests

 ```sh

  yarn test

 ```
### Coverage

 ```sh

  yarn cov

 ```

 ### Build

  ```sh

    yarn build

  ```




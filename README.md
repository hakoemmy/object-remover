## Description

object-remover
## Requirements
- [NPM version 8.5.0](https://www.npmjs.com/package/npm)
- [Nodejs v16.14.2](https://nodejs.org/en)
- [Redis](https://redis.io/docs/getting-started/installation/)
- [MongoDB](https://mongodb.com/)

## Running the app without docker

```bash
object-remover$ npm install
```

```bash
# development
object-remover$ npm run start

# watch mode
object-remover$ npm run start:dev

# production mode
object-remover$ npm run start:prod
```
## Running the app with docker

### Installation

  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/) 

``` bash
   # Spin up the docker container for both mongo DB and server
   object-remover$ docker-compose up
```
## Test

```bash
# unit tests
object-remover$ npm run test

# e2e tests
object-remover$ npm run test:e2e

# test coverage
object-remover$ npm run test:cov
```
## Documentation(Powered by Swagger)
Visit below url in the browser
```
 http://localhost:3000/docs
```


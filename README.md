## Description

Challenge APIs
## Requirements
- [NPM version 8.5.0](https://www.npmjs.com/package/npm)
- [Nodejs v16.14.2](https://nodejs.org/en)
- [Redis](https://redis.io/docs/getting-started/installation/)

## Running the app without docker

```bash
challenge$ npm install
```

```bash
# development
challenge$ npm run start

# watch mode
challenge$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running the app with docker

### Installation

  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/) 

``` bash
   # Spin up the docker container for both mongo DB and server
   challenge$ docker-compose up
```
## Test

```bash
# unit tests
challenge$ npm run test

# e2e tests
challenge$ npm run test:e2e

# test coverage
challenge$ npm run test:cov
```
## Documentation
Visit below url in the browser
```
 http://localhost:3000/docs
```


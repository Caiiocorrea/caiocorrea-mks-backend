
## Description
 Project - Film catalog, the following tools were used:
 
### Technologies implemented:

-   [Nestjs](https://nestjs.com/) 
-   [PostgreSQL](https://www.postgresql.org/)
-   [JWT](https://jwt.io/)
-   [TypeORM](https://typeorm.io/#/)
-   [NestJS Swagger](https://github.com/nestjs/swagger)
-   [NestJS Redis](https://docs.nestjs.com/techniques/caching)

## Installation

```bash
$ npm install or yarn install
```

## Setting up the database for development 

PostgreSQL database connection options are shown in the following table:

| Option   | Development |
| -------- | ----------- 
| Host     | localhost   |
| Port     | 5432        |
| Username | postgres    |
| Password | postgres    |
| Database | postgres    |  

## Running the app

```bash
# development
$ npm run start or npm run start:dev

# development
$ yarn start or yarn start:dev

# docker
$ docker-compose up
```

## Swagger API docs
Swagger docs will be available at [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/).

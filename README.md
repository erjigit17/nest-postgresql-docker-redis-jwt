# nest-postgresql-redis-jwt
## Starter project
### Tools and technologies:
1. Nest,
2. Rest API, swagger
3. TypeOrm
4. Postgresql, pgAdmin
5. Docker, Docker-compose
6. JWT, with refresh token
7. Redis,
8. eslint, prettier, husky,
9. jest, faker, Artillery
10. Healthchecks (Terminus)

### Instruction 
1. create `.env` file. f.e. `.env.example`
2. `docker-compose up -d`
3. `npm run migrate:run`
4. `npm start` documentation `http://127.0.0.1:4000/api`

### TODO
1. CRUD product
3. pagination
2. add orm logging
5. refresh token
6. images
7. set up husky
8. nestjs app to docker
9. deploy
10. Caching
4. mock orm module for unit testing
11. Performance Testing of an Api, using Artillery and Faker
12. tune typeOrm: limit attributes, lin request
13. overload-protection 503 SERVICE UNAVAILABLE
14. api signal for tracking performance metric

### History
1. Before all
   1. check global nest/cli and typescript version `npm outdated -g`
   2. if need to update: for all `npm update -g` or partial `npm update -g <package_name>`
2. create project `nest new starter-project`
3. Sep up Postgres
   1. `npm i @nestjs/typeorm typeorm pg`
   2. create docker-compose.yml with db images and run `docker-compose up -d`
   3. pgAdmin `127.0.0.1:5050`. ! register server: Hostname `postgres` (check docker compose file)
   4. add `TypeOrmModule` to `app.modules.ts` file
4. Configuration
   1. eslint, to your test))
   2. Environment configuration `npm i --save @nestjs/config`
   3. validation env variables via joi `npm i --save joi`
5. create resource users `nest g resource modules/users`
   1. install validator `npm i --save class-validator class-transformer`
6. Migrations
   1. Create TypeOrmCLI config file `ormconfig.ts`
   2. generate migration from entity `npm run migration:generate ./src/database/migrations/<entity_name>`
   3. create migration `npm run migration:create ./src/database/migrations/<migration_name>`
   4. `npm run migrate:run`
7. Create CRUD for user entity
8. create resource auth
9. debugging for idea ide edit configuration -> npm -> choose script `start:debug` press link `ws://127.0.0.1:9229/eac5f030-3aa9-4039-a093-bc0005373ad3`
10. logger level production = 'warn', other 'debug'
11. add rate limiter,  helmet 
12. add health-checker end point, for db health and memory heap 
13. to populate database 10 000 row of products use script `npm run gen-mock-data` then `npm run migrate:run`. Don't open created migration file, it's too heavy! it is best to remove `166576XXXXXXX-Product-Seeding.ts`
14. add index GIN for full text search


### problems solutions
if build project don't work try remove tsconfig.build.tsbuildinfo

https://github.com/NarHakobyan/awesome-nest-boilerplate

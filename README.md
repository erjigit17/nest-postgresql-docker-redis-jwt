# nest-postgresql-redis-jwt
## Starter project
### TODO
1. Entities product, orders
2. pagination
3. refresh token
4. images
5. faker 100 000 rows
6. upgrade nodejs to v18
7. set up husky
8. nestjs app to docker 
9. deploy
10. tune typeOrm: limit attributes, index for text search, lin request 

### Tools and technologies:
1. Nest,
2. Rest API, swagger
3. TypeOrm
4. Postgresql, pgAdmin
5. Docker, Docker-compose
6. JWT, with refresh token
7. Redis,
8. eslint, prettier, husky,


### Instruction 
1. create `.env` file. f.e. `.env.example`
2. `docker-compose up -d`
3. `npm run migrate:run`
4. `npm start` documentation `http://127.0.0.1:4000/api`

### Steps
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



### problems solutions
if build project don't work try remove tsconfig.build.tsbuildinfo

https://github.com/NarHakobyan/awesome-nest-boilerplate

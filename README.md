# nest-postgresql-mongodb-graphql-redis-jwt
## Starter project
### TODO
4. upgrade nodejs to v18
5. set up husky

### Tools and technologies:
1. Nest,
2. Postgresql,
3. Mongodb,
4. Redis,
5. Rest API,
6. Graphql,
7. Docker,
8. JWT,
9. eslint, prettier, husky,
10. swagger

### Instruction
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

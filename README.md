# nest-postgresql-mongodb-graphql-redis-jwt
## Starter project
### Tools and technologies:
1. Nest,
2. Postgresql,
3. Mongodb,
4. Redis,
5. Rest API,
6. Graphql,
7. Docker,
8. JWT,
9. eslint, husky,

### Instruction
1. Before all
   1. check global nest/cli and typescript version `npm outdated -g`
   2. if need to update: for all `npm update -g` or partial `npm update -g <package_name>`
2. create project `nest new starter-project`
3. Sep up Postgres 
   1. `npm i @nestjs/typeorm typeorm pg`
   2. create docker-compose.yml with db images and run `docker-compose up -d`
   3. pgAdmin `127.0.0.1:5050`. ! register server: Hostname `postgres` (check .env POSTGRES_HOST)
4. Configuration
   1. eslint, to your test))
   2. Environment configuration `npm i --save @nestjs/config`
   3. 
5. create resource `nest g resource users`

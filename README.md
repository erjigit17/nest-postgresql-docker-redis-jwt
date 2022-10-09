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

### Instruction
1. check global nest/cli and typescript version `npm outdated -g`
2. if need to update all `npm update -g` or partial `npm update -g <package_name>`
3. `nest new starter-project`
4. `nest g resource users`
5. `npm i @nestjs/typeorm typeorm pg`
6. create docker-compose.yml with db images and run `docker-compose up -d`
7. pgAdmin `127.0.0.1:5050`. ! register server: Hostname `postgres` (check .env POSTGRES_HOST)

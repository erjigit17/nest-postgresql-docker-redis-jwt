import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('envConfig', () => ({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_DB_NAME: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  PGADMIN_DEFAULT_EMAIL: Joi.string().email().required(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
  PGADMIN_PORT: Joi.number().required(),
}));

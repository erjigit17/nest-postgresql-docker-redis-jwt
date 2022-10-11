import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import envConfig from './config/env.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,

    ConfigModule.forRoot({
      validationSchema: Joi.object(envConfig()),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // entities: [__dirname + '/../../modules/**/entities/*.entity.ts'],
        // migrations: [__dirname + '/../../database/migrations/*.ts'],

        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { UsersModule } from './modules/users/users.module';
import { envConfig, loggerLevel } from './config';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,

    HealthCheckerModule,

    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = configService.get('logger');

        return {
          pinoHttp: {
            level: logger.level,
            transport: {
              target: 'pino-pretty',
            },
          },
        };
      },
    }),

    ConfigModule.forRoot({
      load: [loggerLevel],
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
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        autoLoadEntities: true,
      }),
    }),

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

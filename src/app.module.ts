import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { envConfig, loggerLevel, typeormLoggerLevel } from './config';

@Module({
  imports: [
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
      load: [loggerLevel, typeormLoggerLevel],
      validationSchema: Joi.object(envConfig()),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const typeormLogger = configService.get('typeorm-logger');

        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          autoLoadEntities: true,
          logging: typeormLogger.level,
        };
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

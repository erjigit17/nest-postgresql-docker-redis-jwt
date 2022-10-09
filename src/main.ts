import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);

  return port;
}
bootstrap().then((port) => console.log(`Server started on PORT: ${port}`));

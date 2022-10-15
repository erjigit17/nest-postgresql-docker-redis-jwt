import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdProductUUID: string;

  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'open sesame';

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      })
      .expect(201);

    accessToken = response.body.AccessToken;
  });

  it('/products (POST)', () => {
    request(app.getHttpServer())
      .post(`/products`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        title: 'iPhone 16 Ultra Max Pro',
        price: 1000,
      })
      .expect(201);

    // console.log(response?.body?.id);
    // createdProductUUID = response.body.id;
  });

  // it('/products/:id (DELETE)', () =>
  //   request(app.getHttpServer())
  //     .delete(`/products/${createdProductUUID}`)
  //     .set({ Authorization: `Bearer ${accessToken}` })
  //     .expect(200));

  afterAll(() => app.close());
});

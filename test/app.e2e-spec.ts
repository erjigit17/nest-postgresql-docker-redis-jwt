import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdUserUUID: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John',
        email: 'john@smith.com',
        password: 'password',
      })
      .expect(201);

    createdUserUUID = await response.body.id;
    console.log(createdUserUUID);
  });

  it('/users/:id (GET)', () =>
    request(app.getHttpServer())
      .get(`/users/${createdUserUUID}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200));

  it('/users/:id (PATCH)', async () => {
    const updateUserData = {
      email: 'john1@smith.com',
      password: 'password1',
    };
    const response = await request(app.getHttpServer())
      .patch(`/users/${createdUserUUID}`)
      .send(updateUserData)
      .expect(200);

    // accessToken = response.body.token.accessToken;
    accessToken = response.body.token.accessToken;
  });

  it('/users/:id (DELETE)', () =>
    request(app.getHttpServer())
      .delete(`/users/${createdUserUUID}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200));

  afterAll(() => app.close());
});

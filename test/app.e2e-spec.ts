import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

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
        firstName: 'John',
        lastName: 'Dow',
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
    const response = await request(app.getHttpServer())
      .patch(`/users/${createdUserUUID}`)
      .send({
        email: 'new_john@smith.com',
      })
      .expect(200);

    // accessToken = response.body.token.accessToken;
  });

  // it('/users/:id (DELETE)', () =>
  //   request(app.getHttpServer())
  //     .delete(`/users/${createdUserUUID}`)
  //     .set({ Authorization: `Bearer ${accessToken}` })
  //     .expect(200));

  afterAll(() => app.close());
});

import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdUserUUID: string;

  const randomFirstName = faker.name.firstName();
  const randomLastName = faker.name.lastName();
  const randomEmail = faker.internet.email();
  const randomPassword = 'b*$c*0iqg&DetibrH6n#';

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/auth/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: randomFirstName,
        lastName: randomLastName,
        email: randomEmail,
        password: randomPassword,
      })
      .expect(201);

    accessToken = response.body.AccessToken;
    createdUserUUID = response.body.guid;
  });

  it('/auth/login (POST)', async () => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: randomEmail,
        password: randomPassword,
      })
      .expect(200);
  });

  it('/users/:id (GET)', () =>
    request(app.getHttpServer())
      .get(`/users/${createdUserUUID}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200));

  it('/users/me (PATCH)', () =>
    request(app.getHttpServer())
      .patch(`/users/me`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        email: 'new_john@smith.com',
      })
      .expect(200));

  it('/users/:id (DELETE)', () =>
    request(app.getHttpServer())
      .delete(`/users/${createdUserUUID}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200));

  afterAll(() => app.close());
});

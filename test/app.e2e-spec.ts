import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should get a JWT then successfully make a call', async () => {
    const loginRequest = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'John', password: 'pass1234' })
      .expect(200);

    const token = loginRequest.body.access_token;
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authhorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.sub).toEqual(1);
        expect(body.username).toEqual('John');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

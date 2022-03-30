import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TodoEntity } from '../src/todos/entities/todo.entity';

describe('todos', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api');
    await app.init();
  });

  it('TODO 생성', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/todos')
      .send({ contents: '첫번째 TODO' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    const todoInfo = await TodoEntity.findOne({ where: { id: res.body.id } });
    expect(todoInfo.contents).toBe('첫번째 TODO');
  });
});

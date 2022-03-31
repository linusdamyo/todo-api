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

  afterAll(async () => {
    await TodoEntity.destroy({ truncate: true, force: true });
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

  it('TODO 리스트', async () => {
    const res = await request(app.getHttpServer()).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      list: [
        {
          id: res.body.list[0].id,
          contents: '첫번째 TODO',
          isDone: false,
          createdAt: res.body.list[0].createdAt,
          updatedAt: res.body.list[0].updatedAt,
        },
      ],
    });
  });
});

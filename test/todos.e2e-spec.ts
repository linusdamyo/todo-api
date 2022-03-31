import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TodoEntity } from '../src/todos/entities/todo.entity';
import { TodoReferenceEntity } from '../src/todos/entities/todo-reference.entity';

describe('todos', () => {
  let app: INestApplication;
  let todoId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api');
    await app.init();
  });

  afterAll(async () => {
    await TodoReferenceEntity.destroy({ truncate: true, force: true });
    await TodoEntity.destroy({ truncate: true, force: true });
  });

  it('TODO 생성', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/todos')
      .send({ contents: '첫번째 TODO' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    todoId = res.body.id;
    const todoInfo = await TodoEntity.findOne({ where: { id: todoId } });
    expect(todoInfo.contents).toBe('첫번째 TODO');
  });

  it('TODO 리스트', async () => {
    const res = await request(app.getHttpServer()).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      list: [
        {
          id: res.body.list?.[0]?.id,
          contents: '첫번째 TODO',
          isDone: false,
          createdAt: res.body.list?.[0]?.createdAt,
          updatedAt: res.body.list?.[0]?.updatedAt,
          referenceList: [],
        },
      ],
    });
  });

  it('TODO 수정', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/todos/${todoId}`)
      .send({ contents: '첫번째 TODO 내용을 수정' });
    expect(res.statusCode).toBe(200);
    const todoInfo = await TodoEntity.findOne({ where: { id: todoId } });
    expect(todoInfo.contents).toBe('첫번째 TODO 내용을 수정');
  });

  it('TODO 완료 처리', async () => {
    const res = await request(app.getHttpServer()).put(
      `/api/todos/${todoId}/done`,
    );
    expect(res.statusCode).toBe(200);
    const todoInfo = await TodoEntity.findOne({ where: { id: todoId } });
    expect(todoInfo.is_done).toBeTruthy();
  });

  it('TODO 미완료 처리', async () => {
    const res = await request(app.getHttpServer()).put(
      `/api/todos/${todoId}/ready`,
    );
    expect(res.statusCode).toBe(200);
    const todoInfo = await TodoEntity.findOne({ where: { id: todoId } });
    expect(todoInfo.is_done).toBeFalsy();
  });

  it('TODO 삭제', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/api/todos/${todoId}`,
    );
    expect(res.statusCode).toBe(200);
    const todoInfo = await TodoEntity.findOne({ where: { id: todoId } });
    expect(todoInfo).toBeNull();
  });

  describe('TODO 참조 테스트', () => {
    const todoInfoList: TodoEntity[] = [];

    beforeAll(async () => {
      {
        const todoInfo = await TodoEntity.create({ contents: 'todo 아이템 2' });
        todoInfoList.push(todoInfo);
      }
      {
        const todoInfo = await TodoEntity.create({ contents: 'todo 아이템 3' });
        todoInfoList.push(todoInfo);
      }
    });

    it('TODO 아이템 참조', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/todos/${todoInfoList[0].id}/reference`)
        .send({ referenceId: todoInfoList[1].id });
      expect(res.statusCode).toBe(201);
      const todoInfo = await TodoEntity.findOne({
        where: { id: todoInfoList[0].id },
        include: TodoReferenceEntity,
      });
      expect(todoInfo.todoReferenceList[0].todo_id).toEqual(todoInfoList[0].id);
      expect(todoInfo.todoReferenceList[0].reference_id).toEqual(
        todoInfoList[1].id,
      );
    });

    it('TODO 리스트 with 참조목록', async () => {
      const res = await request(app.getHttpServer()).get('/api/todos');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        list: [
          {
            id: res.body.list?.[0]?.id,
            contents: 'todo 아이템 3',
            isDone: false,
            createdAt: res.body.list?.[0]?.createdAt,
            updatedAt: res.body.list?.[0]?.updatedAt,
            referenceList: [],
          },
          {
            id: res.body.list?.[1]?.id,
            contents: 'todo 아이템 2',
            isDone: false,
            createdAt: res.body.list?.[1]?.createdAt,
            updatedAt: res.body.list?.[1]?.updatedAt,
            referenceList: [
              {
                id: res.body.list?.[1]?.referenceList?.[0]?.id,
                referenceId: todoInfoList?.[1]?.id,
              },
            ],
          },
        ],
      });
    });

    it('TODO 완료 불가 - 참조된 항목이 완료되기 전까지는 완료시킬 수 없음', async () => {
      const res = await request(app.getHttpServer()).put(
        `/api/todos/${todoInfoList?.[0]?.id}/done`,
      );
      expect(res.statusCode).toBe(400);
    });
  });
});

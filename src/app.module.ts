import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodoEntity } from './todos/entities/todo.entity';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { TodoReferenceEntity } from './todos/entities/todo-reference.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'ajdajdsiasia',
      database: process.env.DB_NAME || 'todo_test',
      models: [TodoEntity, TodoReferenceEntity],
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

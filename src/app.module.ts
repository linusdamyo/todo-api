import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodoEntity } from './todos/entities/todo.entity';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ajdajdsiasia',
      database: 'todo_test',
      models: [TodoEntity],
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

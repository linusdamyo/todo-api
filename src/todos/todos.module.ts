import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [SequelizeModule.forFeature([TodoEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

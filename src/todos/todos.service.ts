import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(TodoEntity)
    private todoModel: typeof TodoEntity,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todoInfo = await this.todoModel.create({
      contents: createTodoDto.contents,
    });
    if (!todoInfo) throw new ConflictException('cannot create todo.');

    return { id: todoInfo?.id ?? 0 };
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

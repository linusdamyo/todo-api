import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { TodoListResponseDto } from './dto/todo-list-response.dto';
import { IdResponseDto } from '../common/dto/id-response.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(TodoEntity)
    private todoModel: typeof TodoEntity,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<IdResponseDto> {
    const todoInfo = await this.todoModel.create({
      contents: createTodoDto.contents,
    });
    if (!todoInfo) throw new ConflictException('cannot create todo.');

    return new IdResponseDto(todoInfo?.id);
  }

  async findAll(): Promise<TodoListResponseDto> {
    const todoInfoList: TodoEntity[] = (
      await this.todoModel.findAll({
        where: { deleted_at: null },
        order: [['id', 'DESC']],
      })
    ).map((el) => el.get({ plain: true }));

    return new TodoListResponseDto(todoInfoList);
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<IdResponseDto> {
    const todoInfo = (
      await this.todoModel.findOne({
        where: { id },
      })
    ).get({ plain: true });
    if (!todoInfo) throw new BadRequestException(`cannot find todo. id: ${id}`);

    await this.todoModel.update(
      { contents: updateTodoDto.contents },
      { where: { id } },
    );

    return new IdResponseDto(todoInfo?.id);
  }

  async remove(id: number): Promise<IdResponseDto> {
    const todoInfo = (
      await this.todoModel.findOne({
        where: { id },
      })
    ).get({ plain: true });
    if (!todoInfo) throw new BadRequestException(`cannot find todo. id: ${id}`);

    await this.todoModel.destroy({ where: { id } });

    return new IdResponseDto(todoInfo?.id);
  }
}

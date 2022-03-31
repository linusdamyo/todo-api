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
import { ReferenceTodoRequestDto } from './dto/reference-todo-request.dto';
import { TodoReferenceEntity } from './entities/todo-reference.entity';
import { Op } from 'sequelize';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(TodoEntity)
    private todoModel: typeof TodoEntity,
    @InjectModel(TodoReferenceEntity)
    private todoReferenceModel: typeof TodoReferenceEntity,
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
        include: [{ model: TodoReferenceEntity, required: false }],
      })
    ).map((el) => el.get({ plain: true }));

    return new TodoListResponseDto(todoInfoList);
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<IdResponseDto> {
    const todoInfo = await this.getTodoInfo(id);

    await this.todoModel.update(
      { contents: updateTodoDto.contents },
      { where: { id: todoInfo?.id } },
    );

    return new IdResponseDto(todoInfo?.id);
  }

  async done(id: number) {
    const todoInfo = await this.getTodoInfo(id);

    const referenceIdList = todoInfo.todoReferenceList.map(
      (r) => r.reference_id,
    );
    if (
      (await this.todoModel.count({
        where: { is_done: false, id: { [Op.in]: referenceIdList } },
      })) > 0
    ) {
      throw new BadRequestException('완료되지 않은 관련 항목이 존재합니다.');
    }

    await this.todoModel.update(
      { is_done: true },
      { where: { id: todoInfo?.id } },
    );
  }

  async ready(id: number) {
    const todoInfo = await this.getTodoInfo(id);

    await this.todoModel.update(
      { is_done: false },
      { where: { id: todoInfo?.id } },
    );
  }

  async remove(id: number): Promise<IdResponseDto> {
    const todoInfo = await this.getTodoInfo(id);

    await this.todoModel.destroy({ where: { id } });

    return new IdResponseDto(todoInfo?.id);
  }

  async reference(
    id: number,
    reqDto: ReferenceTodoRequestDto,
  ): Promise<IdResponseDto> {
    const todoInfo = await this.getTodoInfo(id);

    await this.todoReferenceModel.create({
      todo_id: id,
      reference_id: reqDto.referenceId,
    });

    return new IdResponseDto(todoInfo?.id);
  }

  private async getTodoInfo(id: number): Promise<TodoEntity> {
    const todoInfo = (
      await this.todoModel.findOne({
        where: { id },
        include: TodoReferenceEntity,
      })
    ).get({ plain: true });
    if (!todoInfo) throw new BadRequestException(`cannot find todo. id: ${id}`);

    return todoInfo;
  }
}

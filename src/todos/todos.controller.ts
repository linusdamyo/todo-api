import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { HttpExceptionFilter } from '../common/exception/http-exception.filter';
import { TodoListResponseDto } from './dto/todo-list-response.dto';
import { IdResponseDto } from '../common/dto/id-response.dto';
import { ReferenceTodoRequestDto } from './dto/reference-todo-request.dto';

@Controller('/todos')
@UseFilters(new HttpExceptionFilter())
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<IdResponseDto> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<TodoListResponseDto> {
    return this.todosService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<IdResponseDto> {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IdResponseDto> {
    return this.todosService.remove(+id);
  }

  @Put(':id/done')
  async done(@Param('id') id: string) {
    return this.todosService.done(+id);
  }

  @Put(':id/ready')
  async ready(@Param('id') id: string) {
    return this.todosService.ready(+id);
  }

  @Post(':id/reference')
  async reference(
    @Param('id') id: string,
    @Body() reqDto: ReferenceTodoRequestDto,
  ): Promise<IdResponseDto> {
    return this.todosService.reference(+id, reqDto);
  }
}

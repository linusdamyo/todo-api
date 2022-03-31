import { TodoEntity } from '../entities/todo.entity';

class TodoReferenceItem {
  id: number;
  referenceId: number;
}
class TodoListItem {
  id: number;
  contents: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  referenceList: TodoReferenceItem[];
}

export class TodoListResponseDto {
  list: TodoListItem[];

  constructor(todoInfoList: TodoEntity[]) {
    this.list = todoInfoList.map((todoInfo) => ({
      id: todoInfo.id,
      contents: todoInfo.contents,
      isDone: todoInfo.is_done,
      createdAt: todoInfo.created_at,
      updatedAt: todoInfo.updated_at,
      referenceList: todoInfo.todoReferenceList.map((r) => ({
        id: r.id,
        referenceId: r.reference_id,
      })),
    }));
  }
}

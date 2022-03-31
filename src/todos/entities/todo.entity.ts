import { TodoReferenceEntity } from './todo-reference.entity';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'todo' })
export class TodoEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ defaultValue: '' })
  contents: string;

  @Column({ defaultValue: false })
  is_done: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @HasMany(() => TodoReferenceEntity, { constraints: false })
  todoReferenceList: TodoReferenceEntity[];
}

import { TodoEntity } from './todo.entity';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'todo_reference' })
export class TodoReferenceEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => TodoEntity)
  @Column({ defaultValue: 0 })
  todo_id: number;

  @Column({ defaultValue: 0 })
  reference_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => TodoEntity, { constraints: false })
  todoInfo: TodoEntity;
}

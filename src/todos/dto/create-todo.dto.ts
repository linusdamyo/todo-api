import { IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @Length(1, 100)
  @IsString()
  contents: string;
}

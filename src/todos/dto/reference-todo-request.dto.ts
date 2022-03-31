import { IsInt } from 'class-validator';

export class ReferenceTodoRequestDto {
  @IsInt()
  referenceId: number;
}

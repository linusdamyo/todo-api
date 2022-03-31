export class IdResponseDto {
  id: number;

  constructor(id: number) {
    this.id = id ?? 0;
  }
}

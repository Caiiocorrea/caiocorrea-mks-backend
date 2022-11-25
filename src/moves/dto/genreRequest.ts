import { ApiProperty } from "@nestjs/swagger";

export default class GenreRequestDto {
  @ApiProperty()
  name: string;
}

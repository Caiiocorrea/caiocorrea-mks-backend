import { ApiProperty } from "@nestjs/swagger";

export default class ArtistRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  local: string;
}

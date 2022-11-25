import { ApiProperty } from "@nestjs/swagger";

export default class UserRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

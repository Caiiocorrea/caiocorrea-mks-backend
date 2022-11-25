import { ApiProperty } from "@nestjs/swagger";
import ArtistRequestDto from "./artistRequest";
import GenreRequestDto from "./genreRequest";

export default class MoveRequestDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  yearrealization: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  artists: ArtistRequestDto[];

  @ApiProperty()
  genres: GenreRequestDto[];
}

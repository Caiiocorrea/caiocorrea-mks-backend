import { MovesController } from "./moves.controller";
import { Artist } from "./entities/artist.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre } from "./entities/genre.entity";
import { MovesService } from "./moves.service";
import { Move } from "./entities/move.entity";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";


@Module({
  imports: [
    TypeOrmModule.forFeature([Move, Artist, Genre]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [MovesService],
  exports: [MovesService],
  controllers: [MovesController],
})
export class MovesModule { }

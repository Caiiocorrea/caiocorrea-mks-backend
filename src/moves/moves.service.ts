import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { MessagesHelper } from "src/helpers/messages.helper";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./entities/artist.entity";
import { Genre } from "./entities/genre.entity";
import MoveRequestDto from "./dto/moveRequest";
import { Move } from "./entities/move.entity";
import { Cache } from 'cache-manager';
import { Repository } from "typeorm";


@Injectable()
export class MovesService {
  constructor(
    @InjectRepository(Move) private movesRepository: Repository<Move>,
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
    @InjectRepository(Genre) private genresRepository: Repository<Genre>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) { }

  async getById(moveData: MoveRequestDto) {
    const move = await this.movesRepository.findOne({
      where: {
        id: moveData.id,
        title: moveData.title,
        yearrealization: moveData.yearrealization,
        duration: moveData.duration,
      }, relations: ["artists", "genres"]
    })
    if (move) return move;
    throw new HttpException(MessagesHelper.ID_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  async list() {
    const moves = await this.movesRepository.find({ relations: ["artists", "genres"] });
    await this.cacheService.set('list-moves', moves, 1000);
    return moves;
  }

  async create(moveData: MoveRequestDto) {
    await this.artistsRepository.save(moveData.artists);
    await this.genresRepository.save(moveData.genres);
    await this.movesRepository.save(moveData);
    await this.cacheService.del('list-moves');
    return moveData;
  }
}

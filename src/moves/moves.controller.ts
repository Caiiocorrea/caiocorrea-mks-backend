import { Controller, Post, HttpException, HttpStatus, Body, UseGuards, Get, CacheTTL, CacheKey, UseInterceptors, CacheInterceptor, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags, } from "@nestjs/swagger";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { MessagesHelper } from "src/helpers/messages.helper";
import { MovesService } from "./moves.service";
import MoveRequestDto from "./dto/moveRequest";
import { Move } from "./entities/move.entity";

@ApiBearerAuth()
@ApiTags("Moves")
@Controller("moves")
@UseInterceptors(CacheInterceptor)
export class MovesController {
  constructor(private readonly movesService: MovesService) { }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create move" })
  async register(@Body() registrationData: MoveRequestDto) {
    try {
      return await this.movesService.create({ ...registrationData });
    } catch (error) {
      console.log({ error: error.code, message: error.message })
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          MessagesHelper.ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        MessagesHelper.SOMETHING_WENT_WRONG,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @CacheTTL(10)
  @CacheKey('list-moves')
  @Get("list")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "list moves" })
  async getMoves() {
    try {
      return await this.movesService.list();
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          MessagesHelper.ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        MessagesHelper.SOMETHING_WENT_WRONG,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("filter")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "filter move" })
  async getById(@Query() requestData: MoveRequestDto) {
    return await this.movesService.getById(requestData);
  }
}

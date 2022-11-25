import { Controller, Post, HttpException, HttpStatus, Body, UseGuards, Get, CacheTTL, CacheKey, UseInterceptors, CacheInterceptor, } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags, } from "@nestjs/swagger";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import CreateUserDto from "./dto/userRequest";
import { UsersService } from "./users.service";
import { MessagesHelper } from '../helpers/messages.helper';

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create user" })
  async register(@Body() registrationData: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
      });
      return createdUser;
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

  @CacheTTL(30)
  @CacheKey('all-users')
  @Get("all-users")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "get all user" })
  async getClient() {
    try {
      const createdUser = await this.usersService.getClient();
      return createdUser;
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
}

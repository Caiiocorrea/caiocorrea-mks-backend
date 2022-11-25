import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@ApiBearerAuth()
@ApiTags("Login")
@Controller("auth")
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @ApiOperation({ summary: "Login with default name and pwd" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

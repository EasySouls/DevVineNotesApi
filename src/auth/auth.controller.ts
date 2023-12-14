import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggerService } from 'src/logger/logger.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private readonly logger = new LoggerService(AuthController.name);

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Prisma.UserCreateInput) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  // TODO Move the Profile tab to /dashboard/profile later
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

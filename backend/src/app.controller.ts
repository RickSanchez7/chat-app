import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ValidateUserInterceptor } from './auth/interceptors/validate-user.interceptor';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body.email, req.body.password);
  }

  // @UseInterceptors(ValidateUserInterceptor)
  // @UseGuards(LocalAuthGuard)
  @Post('auth/signup')
  async signup(@Request() req) {
    return this.authService.signup(
      req.body.username,
      req.body.email,
      req.body.password,
    );
  }

  @UseInterceptors(ValidateUserInterceptor)
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.body;
  }
}

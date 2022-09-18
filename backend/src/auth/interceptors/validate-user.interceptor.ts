import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateUserInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest();

      const token = request.headers['authorization'];
      console.log(token);

      if (!token) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      const BearerToken = token.split(' ')[1];

      this.jwtService.verify(BearerToken, {
        secret: process.env.JWT_SECRET,
      });

      return next.handle();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}

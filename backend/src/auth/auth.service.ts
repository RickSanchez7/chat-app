import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { id, username, email } = user;

      return { id, username, email };
    }
    return null;
  }

  async signup(username: string, email: string, password: string) {
    const hasUser = await this.usersService.findOne(email);

    if (hasUser) {
      throw new BadRequestException('user already exists');
    }

    try {
      const hashedPassword = await this.hashPassword(password);

      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
      });

      newUser.save();

      return {
        id: newUser['_id'],
        userName: newUser.username,
        access_token: this.jwtService.sign({ id: newUser['_id'] }),
      };
    } catch (err) {
      console.error('err', err);
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new BadRequestException('Incorrect email or password');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect email or password');
    }

    return {
      id: user['_id'],
      userName: user.username,
      access_token: this.jwtService.sign({ id: user['_id'] }),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPass = await hash(password, saltOrRounds);

    return hashedPass;
  }
}

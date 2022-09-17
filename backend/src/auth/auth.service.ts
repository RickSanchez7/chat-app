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

  async signup(userName: string, email: string, password: string) {
    // try {
    const hasUser = await this.usersService.findOne(email);

    if (hasUser) {
      throw new BadRequestException('user already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = new this.userModel({
      userName,
      email,
      password: hashedPassword,
    });

    newUser.save();
    // } catch (err) {
    //   console.error('err', err);
    //   throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    // }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new BadRequestException('Incorrect email or password');
    }

    const verifyPass = await compare(password, user.password);

    if (!verifyPass) {
      throw new BadRequestException('Incorrect email or password');
    }

    return {
      access_token: this.jwtService.sign({ id: user['_id'] }),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPass = await hash(password, saltOrRounds);

    return hashedPass;
  }
}

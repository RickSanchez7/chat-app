import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/utils/auth.interface';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      username: 'john',
      email: 'john@email.com',
      password: 'changeme',
    },
    {
      id: '2',
      username: 'maria',
      email: 'maria@email.com',
      password: 'guess',
    },
  ];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });

    return user;
    // return this.users.find((user) => user.email === email);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name } = createUserDto;
      return await this.userModel.create({ name, wallet: 1000000 });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}

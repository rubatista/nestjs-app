import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const userExists = await this.userModel.findOne({
      email: registerUserDto.email,
    });

    if (userExists) {
      throw new ConflictException('Utilizador já existe');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const createUser = new this.userModel({
      email: registerUserDto.email,
      password: hashedPassword,
    });

    return createUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}

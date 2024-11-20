import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthUserDto } from './auth-user.dto';
import { ChangePasswordDto } from './change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async validateUser(authUserDto: AuthUserDto): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email: authUserDto.email });
    if (user && user.password === authUserDto.password) {
      return user;
    }
    return null;
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email: changePasswordDto.email });
    if (!user || user.password !== changePasswordDto.oldPassword) {
      throw new BadRequestException('Invalid email or password');
    }
    user.password = changePasswordDto.newPassword;
    await this.usersRepository.save(user);
  }
}
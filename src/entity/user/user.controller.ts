import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ChangePasswordDto } from './change-password.dto';

class AuthUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Post('auth')
  async authenticate(@Body() authUserDto: AuthUserDto): Promise<{ success: boolean, user?: User }> {
    const user = await this.userService.validateUser(authUserDto);
    if (user) {
      return { success: true, user };
    }
    return { success: false };
  }

  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<void> {
    await this.userService.changePassword(changePasswordDto);
  }
}
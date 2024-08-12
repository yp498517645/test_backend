import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users') // 这个控制器处理 /users 路径下的请求
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('phone/:phone')
  async findByPhone(@Param('email') phone: string): Promise<User> {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new NotFoundException('查无此用户信息');
    }
    return user;
  }

  @Post('/add')
  create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string): Promise<{ msg: string; status: string }> {
    return this.userService.remove(Number(id));
  }

  @Post('update')
  update(@Body() user: Partial<User>): Promise<User> {
    return this.userService.update(user.id, user);
  }
}

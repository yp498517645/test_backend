import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { QueryResponseDto } from './dto/query-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users') // 这个控制器处理 /users 路径下的请求
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(['/list', '/phone'])
  @ApiOperation({ summary: '获取列表' })
  @ApiResponse({
    status: 201,
    description: '成功',
    type: QueryResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: '失败' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('phone/:phone')
  @ApiOperation({ summary: '手机号搜索' })
  @ApiResponse({
    status: 201,
    description: '成功',
    type: QueryResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: '失败' })
  async findByPhone(@Param('phone') phone: string): Promise<User[]> {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new NotFoundException('查无此用户信息');
    }
    return user;
  }

  @Post('/add')
  @ApiOperation({ summary: '新增用户' })
  @ApiResponse({ status: 201, description: '成功', type: QueryResponseDto })
  @ApiResponse({ status: 400, description: '失败' })
  create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 201, description: '成功', type: DeleteResponseDto })
  @ApiResponse({ status: 400, description: '失败', type: DeleteResponseDto })
  remove(
    @Body() user: Partial<User>,
  ): Promise<{ msg: string; status: string }> {
    return this.userService.remove(Number(user.id));
  }

  @Post('update')
  @ApiOperation({ summary: '编辑' })
  @ApiResponse({ status: 201, description: '成功', type: QueryResponseDto })
  @ApiResponse({ status: 400, description: '失败' })
  update(@Body() user: Partial<User>): Promise<User> {
    return this.userService.update(user.id, user);
  }
}

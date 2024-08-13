import { ApiProperty } from '@nestjs/swagger';

export class QueryResponseDto {
  @ApiProperty({ example: 1 })
  id: string;
  @ApiProperty({ example: '这是名字' })
  name: string;
  @ApiProperty({ example: 'sadasd@qq.com' })
  email: string;
  @ApiProperty({ example: '地址 ' })
  address: string;
}

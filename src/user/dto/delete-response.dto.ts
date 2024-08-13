import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  @ApiProperty({ example: '删除成功' })
  msg: string;

  @ApiProperty({ example: 'success' })
  status: string;
}

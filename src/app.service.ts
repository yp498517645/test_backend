import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getMysqlPwd(): string {
    // 获取环境变量的值
    const pwd = this.configService.get<string>('mysql_pwd');
    return pwd;
  }
}

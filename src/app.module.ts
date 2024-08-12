import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'database-1.c1aagmo0guj6.eu-north-1.rds.amazonaws.com', // MySQL 服务器地址
    //   port: 3306, // MySQL 端口
    //   username: 'admin', // MySQL 用户名
    //   password: 'yp15905755107', // MySQL 密码
    //   database: 'test_db', // 要连接的数据库名称
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件路径
    //   synchronize: true, // 自动同步数据库结构, 在生产环境中建议设为 false
    //   logging: true, // 启用 TypeORM 日志
    // }),
    UserModule,
  ],
})
export class AppModule {}

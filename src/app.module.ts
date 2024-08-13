import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使 ConfigModule 在整个应用程序中全局可用
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'database-1.c1aagmo0guj6.eu-north-1.rds.amazonaws.com', // MySQL 服务器地址
        port: 3396,
        username: 'admin', // MySQL 用户名
        password: configService.get<string>('mysql_pwd'),
        database: 'test_db', // 要连接的数据库名称
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件路径
        synchronize: true,
        logging: true, // 启用 TypeORM 日志
        autoLoadEntities: true, // 自动加载实体
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}

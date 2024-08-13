import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
            ),
          }),
          new WinstonCloudWatch({
            logGroupName: 'demo-group', // 替换为你的CloudWatch日志组名
            logStreamName: () => `demo-instance-${Date.now()}`, // 替换为你的CloudWatch日志流名
            awsRegion: 'eu-north-1', // 替换为你使用的AWS区域
            awsAccessKeyId: configService.get<string>('awsAccessKeyId'), // 替换为你的AWS访问密钥ID
            awsSecretKey: configService.get<string>('awsSecretKey'), // 替换为你的AWS密钥
            jsonMessage: true, // 确保日志以JSON格式记录
          }),
        ],
      }),
    }),
  ],
})
export class LoggerModule {}

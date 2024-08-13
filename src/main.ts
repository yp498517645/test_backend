import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置 Swagger 文档生成器
  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('API 文档描述')
    .setVersion('1.0')
    .addTag('api')
    .build();

  // 生成 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);

  // 设置 Swagger UI 路径
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();

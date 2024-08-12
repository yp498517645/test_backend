import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptionModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

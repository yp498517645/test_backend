import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
    // return Promise.resolve([
    //   {
    //     id: '1',
    //     name: 'asd',
    //     email: 'asdasd@qq.com',
    //     phone: '13967672534',
    //     address: 'sss',
    //   },
    // ]);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const encryptedPhone = this.encryptionService.encrypt(email);
    return await this.userRepository.findOne({
      where: { email: encryptedPhone },
    });
  }

  // async findUserByPhone(phone: string): Promise<User | undefined> {
  //   const users = await this.userRepository.find();
  //   const encryptedPhone = this.encryptionService.encrypt(phone);
  //   return users.find((user) => user.email === encryptedPhone);
  // }

  async create(user: Partial<User>): Promise<User> {
    const encryptedPhone = this.encryptionService.encrypt(user.email);
    const newUser = this.userRepository.create({
      ...user,
      email: encryptedPhone,
    });
    return this.userRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

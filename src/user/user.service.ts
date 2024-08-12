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
    return this.userRepository.find({
      select: ['id', 'email', 'name', 'address'],
    });
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const encryptedPhone = this.encryptionService.encrypt(phone);
    return await this.userRepository.findOne({
      where: { phone: encryptedPhone },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const encryptedPhone = this.encryptionService.encrypt(user.phone);
    const newUser = this.userRepository.create({
      ...user,
      phone: encryptedPhone,
    });
    return this.userRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

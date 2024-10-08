import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name); // 直接在类属性中实例化Logger

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}

  findAll(): Promise<User[]> {
    this.logger.log('findAll');
    return this.userRepository.find({
      select: ['id', 'email', 'name', 'address'],
    });
  }

  async findByPhone(phone: string): Promise<User[]> {
    const encryptedPhone = this.encryptionService.encrypt(phone);
    return await this.userRepository.find({
      select: ['id', 'email', 'address', 'name'], // 仅选择这些字段
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

  async update(id: string, user: Partial<User>): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`无此用户`);
    }
    Object.assign(findUser, user);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<{ msg: string; status: string }> {
    try {
      await this.userRepository.delete(id);
      return Promise.resolve({ msg: '删除成功', status: 'success' });
    } catch (error) {
      return Promise.reject({ msg: '删除失败', status: 'error' });
    }
  }
}

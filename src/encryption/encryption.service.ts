import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc'; // 加密算法
  private readonly key = crypto.randomBytes(32); // 32 字节密钥（适合 AES-256）
  private readonly iv = crypto.randomBytes(16); // 16 字节初始向量

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${encrypted}:${this.iv.toString('hex')}`; // 返回加密文本和IV
  }

  decrypt(encryptedText: string): string {
    const [encrypted, iv] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(iv, 'hex'),
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

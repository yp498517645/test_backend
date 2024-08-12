import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Index() // 添加索引
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}

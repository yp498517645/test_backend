import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;
}

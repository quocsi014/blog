import { Expose } from 'class-transformer';
import { Role } from 'src/enum/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  @Expose({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  @Expose({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'avatar_url', nullable: true })
  @Expose({ name: 'avatar_url' })
  avatarUrl: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role', default: Role.Reader })
  role: Role;

  @Column({ default: 1 })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt: Timestamp;

  @CreateDateColumn({ name: 'updated_at' })
  @Expose({ name: 'updated_at' })
  updatedAt: Timestamp;
}

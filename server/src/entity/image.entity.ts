import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt: Timestamp;
}

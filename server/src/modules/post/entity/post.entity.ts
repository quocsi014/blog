import { Expose } from 'class-transformer';
import { BlogStatus } from 'src/enum/blog-status.role';
import { Category } from 'src/modules/category/entity/category.entity';
import { Comment } from 'src/modules/comment/entity/comment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'status', type: 'enum', enum: BlogStatus, default: BlogStatus.Draft})
  status: BlogStatus;

  @ManyToMany(() => Category, (category) => category.posts, { lazy: true })
  categories: Category[];

  @ManyToOne(() => User, (user) => user.posts, { lazy: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post, { lazy: true })
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt: Timestamp;
}

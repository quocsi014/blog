import { Category } from 'src/modules/category/entity/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'thumbnail_url' })
  thumbnailUrl: string;

  @Column({ name: 'content' })
  content: string;

  @ManyToMany(() => Category, (category) => category.posts)
  categories: Category[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}

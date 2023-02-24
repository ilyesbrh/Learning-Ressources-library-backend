import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LearningResource {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamptz',
  })
  startDate: Date;

  @Column({
    type: 'timestamptz'
  })
  endDate: Date;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.learningResources)
  user: User;

  @Column()
  userId: number;
}
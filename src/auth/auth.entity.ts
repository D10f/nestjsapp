import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  // Eager means it will fetch related tasks when user is retrieved from db.
  @OneToMany((_type) => Task, (task) => task.user, { eager: false })
  tasks: Task[];
}

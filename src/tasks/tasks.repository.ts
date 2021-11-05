import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterTasksDto } from './dto/filter-task-dto';
import { User } from 'src/auth/auth.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: FilterTasksDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task').where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    // Selects the associated user entity along each task.
    const tasks = await query.leftJoinAndSelect('task.user', 'author').getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return await this.save(newTask);
  }
}

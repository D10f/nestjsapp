import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterTasksDto } from './dto/filter-task-dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../auth/auth.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true });

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

    try {
      // Selects the associated user entity along each task.
      const tasks = await query
        .leftJoinAndSelect('task.user', 'author')
        .getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Error retrieving tasks for user ${user.username}. ${JSON.stringify(
          error.message,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException(error.message);
    }
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

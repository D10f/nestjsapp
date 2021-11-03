import { EntityRepository, Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from "./dto/create-task-dto";
import { FilterTasksDto } from "./dto/filter-task-dto";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  async getTasks(filterDto: FilterTasksDto): Promise<Task[]> {

    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` }
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.OPEN
    });

    return await this.save(newTask);
  }

}
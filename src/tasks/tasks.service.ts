import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { FilterTasksDto } from './dto/filter-task-dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/auth.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filters: FilterTasksDto, user: User): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filters, user);
  }

  async findById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException(`No tasks were found with id: ${id}`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.findById(id, user);
    const updatedTask = { ...task, ...updateTaskDto };
    await this.tasksRepository.save(updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string, user: User) {
    const result = await this.tasksRepository.delete({ user, id });

    if (!result.affected) {
      throw new NotFoundException(`No tasks were found with id: ${id}`);
    }
  }
}

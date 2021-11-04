import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { FilterTasksDto } from './dto/filter-task-dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ) {}

  getTasks(filters: FilterTasksDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filters);
  }

  async findById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    
    if (!task) {
      throw new NotFoundException(`No tasks were found with id: ${id}`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findById(id);
    const updatedTask = { ...task, ...updateTaskDto };
    await this.tasksRepository.save(updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string) {
    const result = await this.tasksRepository.delete(id);
    
    if (!result.affected) {
      throw new NotFoundException(`No tasks were found with id: ${id}`);
    }
  }
}

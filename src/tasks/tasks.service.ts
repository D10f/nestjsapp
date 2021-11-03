import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { FilterTasksDto } from './dto/filter-task-dto';

@Injectable()
export class TasksService {

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // findById(id: string): Task {
  //   const task = this.tasks.find(task => task.id === id);

  //   if (!task) {
  //     throw new NotFoundException('No task found with that ID');
  //   }

  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const newTask: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   };

  //   this.tasks.push(newTask);

  //   return newTask;
  // }

  // getFilteredTasks(filters: FilterTasksDto) {
  //   let { search, status } = filters;

  //   return this.tasks.filter(task => {

  //     const statusMatch = status
  //       ? status.toUpperCase() === task.status
  //       : true;

  //     const searchMatch = search
  //       ? task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase())
  //       : true;

  //     return statusMatch && searchMatch;
  //   });
  // }

  // updateTask(id: string, property: string, updateTaskDto: UpdateTaskDto): Task {

  //   const task = this.tasks.find(task => task.id === id);

  //   if (!task) {
  //     throw new NotFoundException('No task found with that ID');
  //   }
    
  //   const updatedTask = { ...task, ...updateTaskDto };

  //   this.tasks = this.tasks.map(task => task.id === id ? updatedTask : task);

  //   return updatedTask;
  // }

  // deleteTask(id: string) {
    
  //   const currentTaskNum = this.tasks.length;
  //   this.tasks = this.tasks.filter(task => task.id !== id);
    
  //   if (currentTaskNum === this.tasks.length) {
  //     throw new NotFoundException('No task found with that ID');
  //   }
  // }
}

import { Body, Controller, Get, Param, Post, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { FilterTasksDto } from './dto/filter-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) { }

    @Get()
    getTasks(@Query() filters: FilterTasksDto): Promise<Task[]> {
        return this.TasksService.getTasks(filters);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.TasksService.findById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.TasksService.createTask(createTaskDto);
    }

    @Patch('/:id')
    updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<Task>
    {
        return this.TasksService.updateTask(id, updateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.TasksService.deleteTask(id);
    }

}

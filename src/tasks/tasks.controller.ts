import { Body, Controller, Get, Param, Post, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { FilterTasksDto } from './dto/filter-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) { }

    @Get()
    getTasks(@Query() filters: FilterTasksDto): Task[] {
        if (Object.keys(filters).length) {
            return this.TasksService.getFilteredTasks(filters);
        }
        return this.TasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.TasksService.findById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.TasksService.createTask(createTaskDto);
    }

    @Patch('/:id/:property')
    updateTask(
        @Param('id') id: string,
        @Param('property') property: string,
        @Body() updateTaskDto: UpdateTaskDto
    ): Task {
        return this.TasksService.updateTask(id, property, updateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.TasksService.deleteTask(id);
    }

}

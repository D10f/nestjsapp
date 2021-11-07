import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './tasks.model';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn()
});

const mockTask = {
  id: 'abc',
  title: 'some title',
  description: 'some desc',
  status: TaskStatus.OPEN
};

const mockUser = {
  id: '123',
  username: 'test',
  password: 'password!123',
  tasks: []
};

describe('Task Service', () => {
  let tasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('Should call TasksRepository.getTasks and return result', async () => {
      tasksRepository.getTasks.mockResolvedValueOnce('some tasks...');
      const result = await tasksService.getTasks(null,  mockUser);
      expect(result).toBe('some tasks...');
    });
  });

  describe('findById', () => {
    it('Should call Tasks.Repository.findOne and return a result', async () => {
      tasksRepository.findOne.mockResolvedValueOnce(mockTask);
      const result = await tasksService.findById('abc', mockUser);
      expect(result).toEqual(mockTask);
    });
    
    it('Should call Tasks.Repository.findOne and throw a "NotFoundException" error', async () => {
      tasksRepository.findOne.mockResolvedValueOnce(null);
      expect(tasksService.findById('abc', mockUser)).rejects.toThrow(NotFoundException);
    });
  });

});

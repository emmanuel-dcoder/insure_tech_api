import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { successResponse } from '../config/response';
import { HttpStatus } from '@nestjs/common';

const mockUserService = {
  createUser: jest.fn().mockResolvedValue({
    id: 1,
    name: 'John Doe',
    wallet: 1000000,
  }),
  getAllUsers: jest.fn().mockResolvedValue([
    { id: 1, name: 'John Doe', wallet: 1000000 },
    { id: 2, name: 'Jane Doe', wallet: 1000000 },
  ]),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should create a user and return success response', async () => {
    const createUserDto: CreateUserDto = { name: 'John Doe' };
    const result = await controller.createUser(createUserDto);

    expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual(
      successResponse({
        message: `User created successfully`,
        code: HttpStatus.OK,
        status: 'success',
        data: {
          id: 1,
          name: 'John Doe',
          wallet: 1000000,
        },
      }),
    );
  });

  it('should retrieve all users and return success response', async () => {
    const result = await controller.getAllUsers();

    expect(mockUserService.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual(
      successResponse({
        message: `User retrieved successfully`,
        code: HttpStatus.OK,
        status: 'success',
        data: [
          { id: 1, name: 'John Doe', wallet: 1000000 },
          { id: 2, name: 'Jane Doe', wallet: 1000000 },
        ],
      }),
    );
  });
});

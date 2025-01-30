import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './models/user.model';

const mockUserModel = {
  create: jest.fn().mockImplementation((dto) => ({
    id: 1,
    ...dto,
  })),
  findAll: jest.fn().mockResolvedValue([
    { id: 1, name: 'John Doe', wallet: 1000000 },
    { id: 2, name: 'Jane Doe', wallet: 1000000 },
  ]),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create a user with default wallet balance', async () => {
    const userDto = { name: 'John Doe' };
    const result = await service.createUser(userDto);

    expect(mockUserModel.create).toHaveBeenCalledWith({
      name: 'John Doe',
      wallet: 1000000,
    });
    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      wallet: 1000000,
    });
  });

  it('should retrieve all users', async () => {
    const result = await service.getAllUsers();

    expect(mockUserModel.findAll).toHaveBeenCalled();
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('John Doe');
  });
});

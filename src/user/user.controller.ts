import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from '../config/response';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBody({
    type: CreateUserDto,
    description: `This is for creating or registered a user. By default the user gets 1000000 in the wallet`,
  })
  @ApiResponse({ status: 200, description: `User created successfully` })
  @ApiResponse({
    status: 401,
    description: 'Unable to create unable to create user.',
  })
  async createUser(@Body() crateUserDto: CreateUserDto) {
    const result = await this.usersService.createUser(crateUserDto);

    return successResponse({
      message: `User created successfully`,
      code: HttpStatus.OK,
      status: 'success',
      data: result,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Fetch all Users',
    description: "This endpoint get's all users",
  })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Unable to fetch user not found' })
  async getAllUsers() {
    const data = await this.usersService.getAllUsers();

    return successResponse({
      message:
        data.length !== 0 ? `User retrieved successfully` : `User not found`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}

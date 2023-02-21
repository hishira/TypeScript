import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../schemas/Interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UserService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userServices.getAll();
  }
  @UseGuards(AuthGuard('refreshtoken'))
  @Get('one')
  async findOne(): Promise<IUser[]> {
    return this.userServices.getOne();
  }
}

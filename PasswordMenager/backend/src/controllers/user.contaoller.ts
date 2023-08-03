import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../schemas/Interfaces/user.interface';
import { UserService } from '../services/user.service';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UserService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Get()
  async findAll(): Promise<IUser[] | any> {
    return this.userServices.getAll();
  }

  @UseGuards(AuthGuard('refreshtoken'))
  @Get('one')
  async findOne(): Promise<IUser[] | any> {
    return this.userServices.getOne();
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('update')
  async updateUser(
    @Body(new ValidationPipe({ transform: true })) editUserInfo: EditUserDto,
    @Request() req,
  ): Promise<unknown> {
    return this.userServices.update(req.user._id, editUserInfo);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('userinfo')
  getUserInfo(@Request() req): Promise<IUser> {
    return this.userServices.getUser(req.user._id);
  }
}

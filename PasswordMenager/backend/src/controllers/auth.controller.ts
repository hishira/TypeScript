import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { AuthInfo } from '../schemas/dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userServices: UserService,
    private readonly authservice: AuthService,
  ) {}
  @Post('signup')
  async create(
    @Body(new ValidationPipe({ transform: false })) newuser: CreateUserDto,
  ) {
    this.userServices.create(newuser);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body(new ValidationPipe({ transform: false })) authinfo: AuthInfo,
    @Request() req,
  ) {
    return this.authservice.login(req.user);
  }
}

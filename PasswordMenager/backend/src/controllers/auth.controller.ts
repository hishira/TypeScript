import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnknownUserExceptionFilter } from 'src/errors/UnknownUserFilter';
import { AuthInfo } from '../schemas/dto/auth.dto';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { AuthService } from '../services/auth.service';
@Controller('auth')
@UseFilters(new UnknownUserExceptionFilter())
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('signup')
  async create(
    @Body(new ValidationPipe({ transform: false })) newuser: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.authservice.createUser(newuser);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body(new ValidationPipe({ transform: false })) authinfo: AuthInfo,
    @Request() req,
  ): Promise<TokenObject> {
    return this.authservice.login(req.user);
  }

  @UseGuards(AuthGuard('refreshtoken'))
  @Get('refresh')
  async refresh(@Request() req): Promise<AccesTokenObject> {
    return this.authservice.refreshaccesstoken(req.user);
  }
}

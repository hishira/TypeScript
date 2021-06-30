import {Body,Controller,Post,Get, ValidationPipe, UseGuards} from "@nestjs/common"
import {UserService} from "../services/user.service";
import {IUser} from "../schemas/Interfaces/user.interface";
import { AuthGuard } from '@nestjs/passport';

@Controller("users")
export class UsersController{
    constructor(private readonly userServices: UserService){}


    @UseGuards(AuthGuard("accessToken"))
    @Get()
    async findAll():Promise<IUser[]>{
        return this.userServices.getAll();
    }
    @UseGuards(AuthGuard("refreshtoken"))
    @Get("one")
    async findOne():Promise<IUser[]>{
        return this.userServices.getOne();
    }
}
import {Body,Controller,Post,Get, ValidationPipe} from "@nestjs/common"
import {UserService} from "./user.service";
import {CreateUserDto} from "./schemas/dto/user.dto";
import {IUser} from "./schemas/Interfaces/user.interface";

@Controller("users")
export class UsersController{
    constructor(private readonly userServices: UserService){}

    @Post()
    async create(@Body(new ValidationPipe({transform:false})) newuser:CreateUserDto){
        this.userServices.create(newuser);
    }

    @Get()
    async findAll():Promise<IUser[]>{
        return this.userServices.getAll();
    }
}
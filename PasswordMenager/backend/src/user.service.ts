import {Model} from "mongoose";
import {Injectable,Inject} from "@nestjs/common"
import {IUser} from "./schemas/Interfaces/user.interface";
import {CreateUserDto} from "./schemas/dto/user.dto";

@Injectable()
export class UserService{
    constructor(
        @Inject("USER_MODEL")
        private userModel:Model<IUser>,
    ){}

    async create(userCreateDTO:CreateUserDto): Promise<IUser>{
        console.log(userCreateDTO.login);
        const createdUser = new this.userModel(userCreateDTO);
        return  createdUser.save();
    }

    async getAll(): Promise<IUser[]>{
        return this.userModel.find({}).exec();
    }
}
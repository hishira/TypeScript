import {Model, NativeError} from "mongoose";
import {Injectable,Inject} from "@nestjs/common"
import {IUser} from "../schemas/Interfaces/user.interface";
import {CreateUserDto} from "../schemas/dto/user.dto";
import {AuthInfo} from "../schemas/dto/auth.dto";

@Injectable()
export class UserService{
    constructor(
        @Inject("USER_MODEL")
        private userModel:Model<IUser>,
    ){}

    create(userCreateDTO: CreateUserDto): Promise<IUser>{
        console.log(userCreateDTO.login);
        const createdUser = new this.userModel(userCreateDTO);
        return  createdUser.save();
    }

    getAll(): Promise<IUser[]>{
        return this.userModel.find({}).exec();
    }
    getOne(): Promise<IUser[]>{
        return this.userModel.find({}).limit(1).exec();
    }


}
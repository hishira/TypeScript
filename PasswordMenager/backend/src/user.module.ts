import {Module} from "@nestjs/common";
import {UsersController} from "./user.contaoller"
import {UserService} from "./user.service";
import {userProviders} from "./user.providers";
import {DatabaseModule} from "./database.module";

@Module({
    imports:[DatabaseModule],
    controllers:[UsersController],
    providers:[UserService,...userProviders]
})
export class UserModule{}
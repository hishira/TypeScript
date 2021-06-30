import {Strategy} from "passport-local"
import {PassportStrategy} from "@nestjs/passport";
import {Injectable,UnauthorizedException} from "@nestjs/common"
import {AuthService} from "./services/auth.service";
import {AuthInfo} from "./schemas/dto/auth.dto"
@Injectable()
export class LocalStrategy  extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({usernameField: 'login',
        passwordField: 'password',});
    }

    async validate(login:string,password:string): Promise<any>{
        console.log(login,password)
        const user = await this.authService.valideteUser({login,password});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnknownUserError } from "./errors/UnknownUser.error";
import { AuthService } from "./services/auth.service";
@Injectable()
export class LocalStrategy  extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({usernameField: 'login',
        passwordField: 'password',});
    }

    async validate(login:string,password:string): Promise<any>{
        console.log(login,password)
        console.log("Login auth guard in that place error leci")
        const user = await this.authService.valideteUser({login,password});
        if(!user){
            throw new UnknownUserError();
        }
        return user;
    }
}
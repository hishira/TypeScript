import {IsString, MinLength} from "class-validator";

export class CreateEntryDto{
    @IsString()
    readonly title;

    @IsString()
    readonly username;

    @IsString()
    @MinLength(6)
    readonly password;

    @IsString()
    readonly note;

    @IsString()
    readonly groupid;
}


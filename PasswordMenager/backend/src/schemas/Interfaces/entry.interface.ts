import {Document} from "mongoose";

export interface IEntry extends Document{
    readonly title:string;
    readonly username: string,
    readonly password: string,
    readonly note: string,
    readonly groupid: string,
    readonly userid: string,
}
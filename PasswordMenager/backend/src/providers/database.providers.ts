import * as mongoose from "mongoose";
export const databaseProviders = [
    {
        provide:"DATABASE_CONNECTION",
        useFactory: ():Promise<typeof mongoose>=> mongoose.connect("mongodb://database:27017/PasswordMenager")
    }
]
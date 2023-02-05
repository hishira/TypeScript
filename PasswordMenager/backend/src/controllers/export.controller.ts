import { Controller, Get, Request, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { EntryService } from "src/services/entry.service";
import {writeFileSync} from 'fs'
@Controller('export')
export class ExportController{
    constructor(private readonly entryService: EntryService){}

    @Get('csv')
    @UseGuards(AuthGuard('accessToken'))
    async getCsv(@Request() req ,@Res() response: Response) {
        console.log(req.user);
        const entries = await this.entryService.getByUser(req.user.id);
        let csvData = ['title','password', 'note'].join(', ') + '\r\n'
        entries.forEach((entry)=>{
            csvData+=[entry.title, entry.password, entry.note].join(',')+'\r\n';
        })
        response.set({
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="users.csv"`,
        }).send(csvData);
    }
}
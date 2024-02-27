import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditImportRequest } from 'src/schemas/dto/editImportRequest.dto';
import { CSVPipeBuilder } from 'src/schemas/utils/builders/csvFile.builder';
import { JSONPipeBuilder } from 'src/schemas/utils/builders/jsonFile.builder';
import { ImportService } from 'src/services/import.service';

@Controller('import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Get('importRequest')
  getImportRequests(@Request() req) {
    return this.importService.getUserImportRequest(req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('activate/:id')
  activateImportRequest(@Request() req, @Param('id') importRequestId: string) {
    return this.importService.activateImportRequest(
      importRequestId,
      req.user._id,
    );
  }

  @UseGuards(AuthGuard('accessToken'))
  @Delete('/:id')
  deleteImportRequest(@Param('id') importRequestId: string) {
    return this.importService.deleteImportRequest(importRequestId);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('/:id')
  updateImportRequest(
    @Param('id') importRequestId: string,
    @Body(new ValidationPipe({ transform: true }))
    editImportRequestDto: EditImportRequest,
  ) {
    return this.importService.editImpoerRequest(
      importRequestId,
      editImportRequestDto,
    );
  }

  @UseGuards(AuthGuard('accessToken'))
  @Post('checkCsv')
  @UseInterceptors(FileInterceptor('file'))
  checkCsvFile(
    @Request() req,
    @UploadedFile(CSVPipeBuilder)
    file: Express.Multer.File,
  ) {
    return this.importService.importEntriesFromFile(file, req.user._id, 'csv');
  }

  @UseGuards(AuthGuard('accessToken'))
  @Post('checkJson')
  @UseInterceptors(FileInterceptor('file'))
  checkJsonFile(
    @Request() req,
    @UploadedFile(JSONPipeBuilder)
    file: Express.Multer.File,
  ) {
    return this.importService.importEntriesFromFile(file, req.user._id, 'json');
  }
}

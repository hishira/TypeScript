import { Module } from "@nestjs/common";
import { ExportController } from "src/controllers/export.controller";
import { entryProviders } from "src/providers/entry.providers";
import { EntryService } from "src/services/entry.service";
import { DatabaseModule } from "./database.module";

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [ExportController],
    providers: [EntryService, ...entryProviders]
})
export class ExportModule {}
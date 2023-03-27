import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database.module';
import { GroupExtModule } from 'src/modules/group-ext.module';
import { GroupExistsValidator } from './CheckGroup.validator';
import { GroupService } from './../services/group.service';
@Module({
  imports: [DatabaseModule, GroupExtModule],
  providers: [GroupExistsValidator],
  exports: [GroupExistsValidator],
})
export class ValidatorModule {}

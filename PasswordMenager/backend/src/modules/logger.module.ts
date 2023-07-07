import { Module } from '@nestjs/common';
import { Logger } from 'src/utils/Logger';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}

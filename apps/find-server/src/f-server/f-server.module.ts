import { Module } from '@nestjs/common';
import { FServerService } from './f-server.service';
import { FServerController } from './f-server.controller';

@Module({
  providers: [FServerService],
  controllers: [FServerController],
})
export class FServerModule {}

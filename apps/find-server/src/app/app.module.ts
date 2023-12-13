import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FServerModule } from '../f-server/f-server.module';

@Module({
  imports: [FServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

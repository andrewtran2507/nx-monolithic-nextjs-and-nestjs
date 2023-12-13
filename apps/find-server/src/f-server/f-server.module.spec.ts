import { Test, TestingModule } from '@nestjs/testing';
import { FServerService } from './f-server.service';
import { FServerModule } from './f-server.module';
import { FServerController } from './f-server.controller';

describe('FServerService', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [FServerModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have FServer components', async () => {
    expect(module.get(FServerController)).toBeInstanceOf(
      FServerController,
    );
    expect(module.get(FServerService)).toBeInstanceOf(FServerService);
  });
});

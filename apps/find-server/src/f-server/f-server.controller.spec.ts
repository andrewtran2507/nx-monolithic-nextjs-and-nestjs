import { Test, TestingModule } from '@nestjs/testing';
import { FServerController } from './f-server.controller';
import { FServerService } from './f-server.service';
import { HttpException } from '@nestjs/common';
import { FServerDto } from './dto/f-server.dto';

export const mockFetchResponse = {
  url: 'https://gitlab.com',
};

export const mockFServerService = {
  findLowestPriorityServer: jest.fn((data: FServerDto[]) => {
    try {
      if (data[0].url !== 'httpx://does-not-work.perfume.new') {
        return mockFetchResponse;
      } else {
        throw new Error('Error');
      }
    } catch (e) {
      throw new Error('C Error');
    }
  }),
};

describe('FServerController', () => {
  let controller: FServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FServerController],
      providers: [
        FServerController,
        {
          provide: FServerService,
          useValue: mockFServerService,
        },
      ],
    }).compile();

    controller = module.get<FServerController>(FServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find lowest priority server', async () => {
    const result = await controller.getLowestPriorityServer();
    expect(result).toEqual(mockFetchResponse);
  });

  it('should fail to find lowest priority server', async () => {
    try {
      await controller.getLowestPriorityServer();
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
    }
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FServerService } from './f-server.service';
import {
  mockFetchResponse,
  mockFServerService,
} from './f-server.controller.spec';
import { HttpException } from '@nestjs/common';
import { FServerModule } from './f-server.module';

describe('FServerService UT', () => {
  let service: FServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FServerModule],
      providers: [
        FServerService,
        {
          provide: FServerService,
          useValue: mockFServerService,
        },
      ],
    }).compile();

    service = module.get<FServerService>(FServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find lowest priority server', async () => {
    const input = [
      {
        url: 'https://does-not-work.perfume.new',
        priority: 1,
      },
      {
        url: 'https://gitlab.com',
        priority: 4,
      },
      {
        url: 'http://app.scnt.me',
        priority: 3,
      },
      {
        url: 'https://offline.scentronix.com',
        priority: 2,
      },
    ];
    const response = await service.findLowestPriorityServer(input);
    expect(response).toEqual(mockFetchResponse);
  });

  it('should fail to find lowest priority server', async () => {
    try {
      const input = [
        {
          url: 'https://does-not-work.perfume.new',
          priority: 1,
        },
        {
          url: 'https://does-not-work.perfume.new',
          priority: 4,
        },
        {
          url: 'https://does-not-work.perfume.new',
          priority: 3,
        },
        {
          url: 'https://does-not-work.perfume.new',
          priority: 2,
        },
      ];
      await service.findLowestPriorityServer(input);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
    }
  });
});

import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorResponse, FServerService } from './f-server.service';
import { FServerType } from './schema/f-server.schema';

@ApiTags('find-server')
@Controller('find-server')
export class FServerController {
  constructor(private readonly FServerService: FServerService) {}

  @Get('/getLowestPriority')
  async getLowestPriorityServer(): Promise<FServerType | ErrorResponse> {
    try {
      const serverList = [
        {
          url: 'https://does-not-work.perfume.new',
          priority: 1,
        },
        {
          url: 'https://gitlab.com',
          priority: 4,
        },
        {
          url: 'https://theculturetrip.com',
          priority: 7,
        },
        {
          url: 'http://app.scnt.me',
          priority: 3,
        },
        {
          url: 'https://www.apple.com',
          priority: 5,
        },
        {
          url: 'https://genk.vn',
          priority: 6,
        },
      ];
      return await this.FServerService.findLowestPriorityServer(serverList);
    } catch {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Something went wrong',
          content: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FServerDto } from './dto/f-server.dto';
import { FServerType } from './schema/f-server.schema';
import fetch from 'node-fetch';

export type ErrorResponse = {
  statusCode: number;
  message: string;
  content: string | null;
};

@Injectable()
export class FServerService {
  async findLowestPriorityServer(
    data: FServerDto[],
  ): Promise<FServerType | ErrorResponse> {
    const timeout = 5000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      let responseNo: number = 0;
      const responses = (await Promise.allSettled(
        data.map(async (server) => {
          const response = await fetch(server.url, {
            timeout,
            signal: controller.signal,
          });
          clearTimeout(id);
          if (response.status <= 299 && response.status >= 200) {
            responseNo = responseNo + 1;
            return {
              ...server,
              priority: responseNo,
            };
          }
        }),
      )) as PromiseSettledResult<FServerType | undefined>[];

      const aliveServers = responses
        .filter((item) => item.status === 'fulfilled')
        .map((item: PromiseFulfilledResult<FServerType>) => item?.value)
        .sort((a, b) => a.priority - b.priority);

      if (aliveServers?.length === 0) {
        throw new HttpException(
          {
            statusCode: 404,
            message: 'All servers not working',
            content: null,
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        const lowestPriorityUrl = aliveServers[0];
        return {
          url: lowestPriorityUrl.url,
        };
      }
    } catch (err) {
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

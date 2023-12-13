import { ApiProperty } from '@nestjs/swagger';

export class FServerDto {
  @ApiProperty({ type: String, default: 'https://does-not-work.perfume.new' })
  url: string;

  @ApiProperty({ type: Number, default: 1 })
  priority: number;
}

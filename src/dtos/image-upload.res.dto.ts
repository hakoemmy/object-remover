import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResV1 } from '../__helpers__';

export class UploadImageResDto extends BaseResV1 {
  @ApiProperty({
    description: 'The game server max players count',
  })
  @Expose()
  message: string
}
import { UserTokenResponse } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class UserTokenRDO implements UserTokenResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NTkyNDczMywiZXhwIjoxNjc2MDExMTMzfQ.No7d03ICMRgG9jYRGnNg79eENFPoayTpxocYv7re2cw',
  })
  @Expose()
  accessToken: string;
}

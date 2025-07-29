import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateCustomDto {
  @IsString()
  @IsOptional()
  key?: string;

  @ApiProperty({
    description: 'Custom JSON payload to store',
    type: Object,
    example: { foo: 'bar', count: 42 },
  })
  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;
}

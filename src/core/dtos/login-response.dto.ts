import { IsString } from "class-validator";
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class LoginResponseDto {
    @Expose()
    @IsString()
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    access_token: string;
}

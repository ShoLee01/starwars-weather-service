import { IsEmail, IsString } from "class-validator";
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class LoginDto {
    @Expose()
    @IsEmail()
    @ApiProperty({ example: 'usuario@ejemplo.com' })
    email: string;
    @Expose()
    @IsString()
    @ApiProperty({ example: '*******' })
    password: string;
}

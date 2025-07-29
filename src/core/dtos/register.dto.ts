import { IsEmail, IsString } from "class-validator";
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class RegisterDto {
    @Expose()
    @IsEmail()
    @ApiProperty({ example: 'usuario@ejemplo.com' })
    email: string;
    @Expose()
    @IsString()
    @ApiProperty({ example: '*******' })
    password: string;
    @Expose()
    @IsString()
    @ApiProperty({ example: 'Miguel Alfaro' })
    name: string;
}

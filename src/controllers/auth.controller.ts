import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';

import { AuthUseCases } from '../user-cases/auth/auth-use-cases.service';
import { Public } from 'src/security/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { LoginDto, LoginResponseDto } from 'src/core/dtos/index';
import { RegisterDto } from 'src/core/dtos/register.dto';

@ApiTags('auth') 
@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly auth: AuthUseCases) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión' })
  @ApiResponse({ status: 200, type: LoginResponseDto, schema: { example: { access_token: '...' } }})
  @HttpCode(HttpStatus.OK)
  async login(
      @Body() createUserDto: LoginDto,
  ): Promise<LoginResponseDto> {
      return this.auth.login(createUserDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiResponse({ status: 201, type: RegisterDto, description: 'Usuario registrado correctamente' })
  @HttpCode(HttpStatus.CREATED)
  async register(
      @Body() createUserDto: RegisterDto,
  ): Promise<RegisterDto> {
      return this.auth.register(createUserDto);
  }
}

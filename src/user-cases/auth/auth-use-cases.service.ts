import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponseDto } from 'src/core/dtos/index';
import { StorageService } from '../../frameworks/dynamodb-service/storage.service';
import { AuthFactoryService } from './auth-factory.service';
import { RegisterDto } from 'src/core/dtos/register.dto';

@Injectable()
export class AuthUseCases {
  constructor(
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  async login(user: LoginDto): Promise<LoginResponseDto> {
    return await this.authFactoryService.login(user);
  }

  async register(user: RegisterDto): Promise<RegisterDto> {
    return await this.authFactoryService.createUser(user);
  }
}

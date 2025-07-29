import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StorageService } from 'src/frameworks/dynamodb-service/storage.service';
import { RegisterDto } from 'src/core/dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponseDto } from 'src/core/dtos/index';
import { LoggerService } from 'src/shared/logging/logging.service';

@Injectable()
export class AuthFactoryService {
  constructor(
    private readonly storageService: StorageService,
    private readonly logger: LoggerService,
    private readonly jwt: JwtService,
  ) {}

  async createUser(user: RegisterDto): Promise<RegisterDto> {
    this.logger.logInfo('AuthFactoryService', `[LOG] Creating user...`);
    await this.storageService.createUser(user);
    this.logger.logInfo('AuthFactoryService', `[LOG] User created with email: ${user.email}`);
    return user;
  }

  async validateUser(user: LoginDto): Promise<boolean> {
    const userExists = await this.storageService.getUserByEmailAndPassword(user);
    if (userExists) return true;
    this.logger.logError('AuthFactoryService', `[ERROR] User login: ${user.email}`);
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(user: LoginDto): Promise<LoginResponseDto> {
    await this.validateUser(user);
    const payload = { sub: '1', email: user.email };
    return {
        access_token: this.jwt.sign(payload),
    };
  }
}
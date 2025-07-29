import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthUseCases } from './auth-use-cases.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../../controllers/auth.controller';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { AuthFactoryService } from './auth-factory.service';
import { StorageServicesModule } from 'src/services/dynamodb-service/storage-service.module';
import { LoggingModule } from 'src/shared/logging/logging.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const jwt = cfg.get<{ secret: string; expiresIn: string }>('jwt', { infer: true });
        return { secret: jwt.secret, signOptions: { expiresIn: jwt.expiresIn } };
      },
    }),
    StorageServicesModule,
    LoggingModule,
  ],
  controllers: [AuthController],
  providers: [AuthUseCases, AuthFactoryService, JwtStrategy],
  exports: [AuthUseCases, AuthFactoryService, PassportModule, JwtModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from './shared/logging/logging.module';
import { PlanetModule } from './user-cases/planet/planet-use-cases.module';
import { AuthModule } from './user-cases/auth/auth-use-cases.module';
import { WeatherModule } from './user-cases/weather/weather.module';
import { HttpModule } from './shared/http-client/http.module';
import { StorageServicesModule } from './services/dynamodb-service/storage-service.module';
import { PlanetLocationModule } from './user-cases/planet/planet-location.module';
import { CustomDataModule } from './user-cases/custom-data/custom-data-use-cases.module';
import { AppController } from './controllers/app.controller';
import configuration from './config/configuration';
import { FusionModule } from './user-cases/fusion/fusion-use-cases.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './security/throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,   // ventana de 60 segundos
          limit: 10,  // hasta 10 peticiones
        },
      ],
    }),
    AuthModule, 
    PlanetModule, 
    LoggingModule, 
    WeatherModule,
    HttpModule,
    PlanetLocationModule,
    StorageServicesModule,
    CustomDataModule,
    FusionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}

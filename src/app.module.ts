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

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [configuration],
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
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { FusionFactoryService } from './fusion-factory.service';
import { FusionUseCases } from './fusion.use-cases';
import { PlanetLocationModule } from '../planet/planet-location.module';
import { PlanetModule } from '../planet/planet-use-cases.module';
import { WeatherModule } from '../weather/weather.module';
import { StorageServicesModule } from 'src/services/dynamodb-service/storage-service.module';
import { LoggingModule } from 'src/shared/logging/logging.module';

@Module({
  controllers: [],
  imports: [
    PlanetLocationModule,
    PlanetModule,
    WeatherModule,
    StorageServicesModule,
    LoggingModule,
  ],
  providers: [FusionFactoryService, FusionUseCases],
  exports: [FusionFactoryService, FusionUseCases],
})
export class FusionModule {}

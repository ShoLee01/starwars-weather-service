import { Module } from '@nestjs/common';
import { PlanetLocationService } from './planet-location.service';

@Module({
  controllers: [],
  providers: [PlanetLocationService],
  exports: [PlanetLocationService],
})
export class PlanetLocationModule {}

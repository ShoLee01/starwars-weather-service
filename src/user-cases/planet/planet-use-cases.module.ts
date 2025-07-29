import { Module } from '@nestjs/common';
import { PlanetUseCases } from './planet.use-cases';
import { HttpModule } from 'src/shared/http-client/http.module';

@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [PlanetUseCases],
  exports: [PlanetUseCases],
})
export class PlanetModule {}

import { Module } from '@nestjs/common';
import { WeatherUseCases } from './weather.use-cases';
import { HttpModule } from 'src/shared/http-client/http.module';

@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [WeatherUseCases],
  exports: [WeatherUseCases],
})
export class WeatherModule {}

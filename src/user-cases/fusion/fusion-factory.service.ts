import { Injectable } from '@nestjs/common';
import { Fusion } from 'src/core/entities/fusion.entity';
import { WeatherUseCases } from '../weather/weather.use-cases';
import { PlanetLocationService } from '../planet/planet-location.service';
import { PlanetUseCases } from '../planet/planet.use-cases';
import { getRandomInt1To60 } from 'src/utils/utils';
import { StorageService } from 'src/frameworks/dynamodb-service/storage.service';
import { LoggerService } from 'src/shared/logging/logging.service';

@Injectable()
export class FusionFactoryService {

  constructor(
    private readonly planetLocationService: PlanetLocationService,
    private readonly planetUseCases: PlanetUseCases,
    private readonly weatherUseCases: WeatherUseCases,
    private readonly storageService: StorageService,
    private readonly logger: LoggerService,
  ) {}

  async createFusion(): Promise<Fusion> {
    const newFusion = new Fusion();
    const planetId = getRandomInt1To60();
    let planet = await this.storageService.getPlanetCached(planetId.toString());

    if (!planet) {
      this.logger.logInfo('FusionFactoryService', `[LOG] Planet ${planetId} not in cache, fetching from API...`);
      planet = await this.planetUseCases.findPlanet(planetId);
      await this.storageService.savePlanet(planetId.toString(), planet);
    }
    newFusion.planet = planet;
    const coords = this.planetLocationService.getCoords(planet.name);
    if (coords) {
      try {
        const weatherResponse = await this.weatherUseCases.getCurrentByCoords(coords.lat, coords.lon);
        newFusion.weather = weatherResponse;
      } catch (err) {
        this.logger.logError('FusionFactoryService', `[ERROR] Error fetching weather for ${planet.name}: ${err.message}`);
      }
    } else {
      this.logger.logWarning('FusionFactoryService', `[WARN] No coordinates found for planet ${planet.name}`);
    }
    newFusion.createdAt = new Date();
    await this.storageService.createFusion(newFusion);
    return newFusion;
  }

  async findAllFusions(
    page?: number,
    limit?: number,
  ): Promise<{
    items: Fusion[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.storageService.getHistory(page, limit);
  }
}

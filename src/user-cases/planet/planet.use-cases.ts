// src/planet/planet.service.ts
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { HttpClientService } from 'src/shared/http-client/http-client.service';
import { PlanetResultDto } from 'src/core/dtos/index';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PlanetUseCases {
  private readonly swapiBase: string;

  constructor(
    private readonly http: HttpClientService,
    private readonly config: ConfigService,
  ) {
    this.swapiBase = this.config.get<string>('swapi.baseUrl')!;
  }

  async findPlanet(id: number): Promise<PlanetResultDto> {
    const url = `${this.swapiBase}/planets/${id}`;
    const raw = await this.http.get<PlanetResultDto>(url);
    return plainToInstance(PlanetResultDto, raw, { excludeExtraneousValues: true });
  }
}

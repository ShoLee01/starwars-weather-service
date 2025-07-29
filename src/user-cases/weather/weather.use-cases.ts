// src/weather/weather.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NormalizedCurrentDto } from 'src/core/dtos/index';
import { WeatherDto } from 'src/core/dtos/weather.dto';
import { HttpClientService } from 'src/shared/http-client/http-client.service';

@Injectable()
export class WeatherUseCases {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly http: HttpClientService,
    private readonly config: ConfigService,
  ) {
    const v = this.config.get('weather') as Record<string, string>;
    this.baseUrl = v.baseUrl;
    this.apiKey = v.apiKey;
  }

  async getCurrentByCoords(lat: number, lon: number): Promise<NormalizedCurrentDto> {
    const url    = `${this.baseUrl}/current.json`;
    const params = {
      key: this.apiKey,
      q: `${lat},${lon}`,
      lang: 'es',
      aqi: 'no',
    };
    const raw = await this.http.get<WeatherDto>(url, params);

    const normalized = plainToInstance(
      NormalizedCurrentDto,
      raw.current,
      { excludeExtraneousValues: true }
    );
    await validateOrReject(normalized);

    return normalized;
  }
}

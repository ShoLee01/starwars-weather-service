import { ApiProperty } from '@nestjs/swagger';
import { NormalizedCurrentDto, PlanetResultDto } from '../dtos';

/**
 * Modelo de datos fusionados: SWAPI + WeatherAPI
 */
export class Fusion {
  @ApiProperty({
    description: 'Datos del planeta obtenidos de SWAPI',
    type: () => PlanetResultDto,
  })
  planet: PlanetResultDto;

  @ApiProperty({
    description: 'Datos de clima normalizados obtenidos de WeatherAPI',
    type: () => NormalizedCurrentDto,
  })
  weather: NormalizedCurrentDto;

  @ApiProperty({
    description: 'Fecha y hora de creación de la fusión (ISO 8601)',
    type: String,
    format: 'date-time',
    example: '2025-07-29T02:00:00.000Z',
  })
  createdAt: Date;
}

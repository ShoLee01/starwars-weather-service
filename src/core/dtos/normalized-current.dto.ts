// src/weather/dto/normalized-current.dto.ts
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Expose, Type } from 'class-transformer';
import { ConditionDto } from './condition.dto';


export class NormalizedCurrentDto {
  @Expose({ name: 'last_updated_epoch' })
  @Transform(({ value }) => new Date(value * 1000).toISOString())
  @IsDateString()
  lastUpdated: string;

  @Expose({ name: 'is_day' })
  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  isDay: boolean;

  @Expose({ name: 'temp_c' })
  @IsNumber()
  tempC: number;

  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;  // puedes reutilizar tu ConditionDto

  @Expose({ name: 'wind_kph' })
  @Transform(({ value }) => parseFloat((value / 3.6).toFixed(2)))
  @IsNumber()
  windSpeedMps: number;

  @Expose({ name: 'pressure_mb' })
  @IsNumber()
  pressureMb: number;

  @Expose({ name: 'precip_mm' })
  @IsNumber()
  precipMm: number;

  @Expose({ name: 'vis_km' })
  @IsNumber()
  visibilityKm: number;

  @Expose({ name: 'feelslike_c' })
  @IsNumber()
  feelsLikeC: number;

  @Expose({ name: 'dewpoint_c' })
  @IsNumber()
  dewPointC: number;

  @Expose({ name: 'uv' })
  @IsNumber()
  uvIndex: number;
}

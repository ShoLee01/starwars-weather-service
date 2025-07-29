import {
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ConditionDto {
  @IsString()
  text: string;

  @IsUrl()
  icon: string;

  @IsNumber()
  code: number;
}

export class CurrentDto {
  @IsNumber()
  last_updated_epoch: number;

  @IsString()
  last_updated: string;

  @IsNumber()
  temp_c: number;

  @IsNumber()
  temp_f: number;

  @IsNumber()
  is_day: number;

  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;

  @IsNumber()
  wind_mph: number;

  @IsNumber()
  wind_kph: number;

  @IsNumber()
  wind_degree: number;

  @IsString()
  wind_dir: string;

  @IsNumber()
  pressure_mb: number;

  @IsNumber()
  pressure_in: number;

  @IsNumber()
  precip_mm: number;

  @IsNumber()
  precip_in: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  cloud: number;

  @IsNumber()
  feelslike_c: number;

  @IsNumber()
  feelslike_f: number;

  @IsNumber()
  windchill_c: number;

  @IsNumber()
  windchill_f: number;

  @IsNumber()
  heatindex_c: number;

  @IsNumber()
  heatindex_f: number;

  @IsNumber()
  dewpoint_c: number;

  @IsNumber()
  dewpoint_f: number;

  @IsNumber()
  vis_km: number;

  @IsNumber()
  vis_miles: number;

  @IsNumber()
  uv: number;

  @IsNumber()
  gust_mph: number;

  @IsNumber()
  gust_kph: number;
}

export class WeatherDto {
  @ValidateNested()
  @Type(() => CurrentDto)
  current: CurrentDto;
}
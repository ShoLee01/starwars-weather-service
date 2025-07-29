import { 
  IsString, 
  IsNotEmpty, 
  IsArray, 
  IsDate, 
  IsUrl 
} from 'class-validator';
import { Type } from 'class-transformer';

export class PlanetResultDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  rotation_period: string;

  @IsString()
  @IsNotEmpty()
  orbital_period: string;

  @IsString()
  @IsNotEmpty()
  diameter: string;

  @IsString()
  @IsNotEmpty()
  climate: string;

  @IsString()
  @IsNotEmpty()
  gravity: string;

  @IsString()
  @IsNotEmpty()
  terrain: string;

  @IsString()
  @IsNotEmpty()
  surface_water: string;

  @IsString()
  @IsNotEmpty()
  population: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  residents: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  films: string[];

  @Type(() => Date)
  @IsDate()
  created: Date;

  @Type(() => Date)
  @IsDate()
  edited: Date;

  @IsUrl()
  url: string;
}
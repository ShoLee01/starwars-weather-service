import { 
  IsString, 
  IsNotEmpty, 
  IsDate, 
} from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class PlanetResultDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  rotation_period: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  orbital_period: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  diameter: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  climate: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  gravity: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  terrain: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  surface_water: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  population: string;
}
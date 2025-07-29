import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Throttle, seconds } from '@nestjs/throttler';

import { CreateCustomDto } from 'src/core/dtos/create-custom.dto';
import { Fusion } from 'src/core/entities/fusion.entity';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { CustomDataUseCases } from 'src/user-cases/custom-data/custom-data.use-cases';
import { FusionUseCases } from 'src/user-cases/fusion/fusion.use-cases';

@ApiTags('starwars-weather')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(
    private readonly fusionUseCases: FusionUseCases,
    private readonly customDataUseCases: CustomDataUseCases,
  ) {}

  /** GET /fusionados */
  @Get('fusionados')
  @Throttle({
    default: {
      limit: 2,
      ttl: seconds(20),   // ventana de 20 segundos (convertido a ms)
    },
  })
  @ApiOperation({ summary: 'Crear fusiones' })
  @ApiResponse({ status: 200, type: Fusion, description: 'Datos fusionados de SWAPI + WeatherAPI' })
  async getFusion(): Promise<Fusion> {
    return this.fusionUseCases.getFusion();
  }

  /** POST /almacenar */
  @Post('almacenar')
  @ApiOperation({ summary: 'Guardar data personalizada' })
  @ApiResponse({ status: 201, type: CreateCustomDto, description: 'Información personalizada almacenada correctamente' })
  async createCustomData(
    @Body() dto: CreateCustomDto,
  ): Promise<{ message: string }> {
    await this.customDataUseCases.createCustomData(dto);
    return { message: 'Guardado correctamente' };
  }

  /** GET /historial?page=1&limit=10 */
  @Get('historial')
  @ApiOperation({ summary: 'Ver el historial de combinaciones' })
  @ApiResponse({
    status: 200,
    description: 'Historial de datos fusionados paginado',
    schema: {
      properties: {
        items: { type: 'array', items: { $ref: '#/components/schemas/Fusion' } },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    },
  })
  async getAllFusions(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{
    items: Fusion[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.fusionUseCases.getAllFusions(page, limit);
  }
}

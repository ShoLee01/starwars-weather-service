import { Injectable } from '@nestjs/common';
import { FusionFactoryService } from './fusion-factory.service';
import { Fusion } from 'src/core/entities/fusion.entity';

@Injectable()
export class FusionUseCases {
  constructor(
    private fusionFactoryService: FusionFactoryService,
  ) {}

  getFusion(): Promise<Fusion> {
    return this.fusionFactoryService.createFusion();
  }

  getAllFusions(
    page?: number,
    limit?: number,
  ): Promise<{
    items: Fusion[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.fusionFactoryService.findAllFusions(page, limit);
  }
}

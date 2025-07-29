import { Injectable } from '@nestjs/common';
import { CustomDataFactoryService } from './custom-data.service';
import { Fusion } from 'src/core/entities/fusion.entity';
import { CreateCustomDto } from 'src/core/dtos/create-custom.dto';

@Injectable()
export class CustomDataUseCases {
  constructor(
    private customDataFactoryService: CustomDataFactoryService,
  ) {}

  createCustomData(data: CreateCustomDto): Promise<any> {
    return this.customDataFactoryService.create(data);
  }
}

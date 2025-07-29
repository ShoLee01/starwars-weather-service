import { Injectable } from '@nestjs/common';
import { CreateCustomDto } from 'src/core/dtos/create-custom.dto';
import { StorageService } from 'src/frameworks/dynamodb-service/storage.service';
import { LoggerService } from 'src/shared/logging/logging.service';
import { uuid } from 'uuidv4';


@Injectable()
export class CustomDataFactoryService {
  constructor(
    private readonly storageService: StorageService,
    private readonly logger: LoggerService,
  ) {}

  async create(data: CreateCustomDto): Promise<any> {
    this.logger.logInfo('CustomDataFactoryService', `[LOG] Creating custom data`, data);
    data.key = data.key || uuid();
    // validate data
    if (!data.data || typeof data.data !== 'object') {
      this.logger.logInfo('CustomDataFactoryService', `[ERROR] Creating custom data`, data);
      throw new Error('Invalid data format. Expected an object.');
    }
    // Create custom data object
    const customData = {
      key: data.key,
      data: data.data,
      createdAt: new Date(),
    };
    // Optionally save to storage
    await this.storageService.createCustomData(customData);
    this.logger.logInfo('CustomDataFactoryService', `Custom data created with key: ${customData.key}`);
    return customData;
  }
}

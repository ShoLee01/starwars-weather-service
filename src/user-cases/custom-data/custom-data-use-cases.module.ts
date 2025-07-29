import { Module } from '@nestjs/common';
import { CustomDataFactoryService } from './custom-data.service';
import { CustomDataUseCases } from './custom-data.use-cases';
import { StorageServicesModule } from 'src/services/dynamodb-service/storage-service.module';
import { LoggingModule } from 'src/shared/logging/logging.module';


@Module({
  controllers: [],
  imports: [
    StorageServicesModule,
    LoggingModule,
  ],
  providers: [CustomDataFactoryService, CustomDataUseCases],
  exports: [CustomDataFactoryService, CustomDataUseCases],
})
export class CustomDataModule {}

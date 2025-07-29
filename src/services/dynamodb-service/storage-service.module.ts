import { Module } from '@nestjs/common';
import { StorageService } from 'src/frameworks/dynamodb-service/storage.service';


@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageServicesModule {}

import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { deviceProviders } from './device.provider';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [DeviceService, ...deviceProviders],
  exports: [DeviceService, ...deviceProviders]
})
export class DeviceModule {}
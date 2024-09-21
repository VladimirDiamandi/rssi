import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { signalProviders } from './signal.provider';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [SignalService, ...signalProviders],
  exports: [SignalService, ...signalProviders]
})
export class SignalModule {}
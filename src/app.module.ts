import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalModule } from './database/signal/signal.module';
import { DeviceModule } from './database/device/device.module';
import { SignalService } from './database/signal/signal.service';
import { ConfigModule } from './config/config.module';
import { AlertService } from './alert.service';
import { Scheduler } from './scheduler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SignalModule,
    DeviceModule,
    ConfigModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SignalService,
    AlertService,
    Scheduler,
  ],
})
export class AppModule {}

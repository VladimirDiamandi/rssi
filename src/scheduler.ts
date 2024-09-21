import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AlertService } from './alert.service';
import { DeviceService } from './database/device/device.service';

@Injectable()
export class Scheduler {
  constructor(
    private readonly alertService: AlertService,
    private readonly deviceService: DeviceService,
  ) { }

  @Cron('* * * * *') // every minute
  async checkLostSignals() {
    try {
      const lostDevices = await this.deviceService.getLost();
      for (const lostDevice of lostDevices) {
        await this.alertService.pushAlert({ deviceId: String(lostDevice._id), last: lostDevice.lostAt});
      }
    } catch (error) {
      console.error('Scheduler run error', error.message, error.stack);
      // todo switch to some custom logger to file or some storage
    }
  }
}
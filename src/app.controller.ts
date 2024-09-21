import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SignalService } from './database/signal/signal.service';
import { ISignalPayload } from './dto/signal.dto';
import { ConfigService } from './config/config.service';
import { DeviceService } from './database/device/device.service';

@Controller()
export class AppController {
  private MIN_VALUE: number;

  constructor(
    private readonly signalService: SignalService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceService,
  ) {
    this.MIN_VALUE = parseFloat(this.configService.get('MIN_VALUE'));
  }

  @Post('/push/signal')
  async getHello(@Body() payload: ISignalPayload): Promise<string> {
    const { deviceId, rssiLevel } = payload;

    try {
      const device = await this.deviceService.getById(deviceId);
      await this.signalService.create({ device, rssiLevel });
      if (rssiLevel < this.MIN_VALUE) {
        await this.deviceService.setLost(device);
      } else {
        await this.deviceService.setActive(device);
      }

      return 'OK';
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/lost')
  async getLost() {
    try {
      return await this.deviceService.getLost();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

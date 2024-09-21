import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SignalService } from './database/signal/signal.service';
import { ConfigService } from './config/config.service';
import { DeviceService } from './database/device/device.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [SignalService, ConfigService, DeviceService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return array', () => {
      const result = appController.getLost();
      const type = typeof result;
      expect(type).toBe('array');
    });
  });
});

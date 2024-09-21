
// Unit tests for: pushSignal
import { HttpException } from '@nestjs/common';

import { AppController } from './app.controller';
import { ISignalPayload } from './dto/signal.dto';


// Mock classes
class MockSignalService {
  create = jest.fn();
}

class MockDeviceService {
  getById = jest.fn();
  setLost = jest.fn();
  setActive = jest.fn();
}

class MockConfigService {
  get = jest.fn().mockReturnValue('10');
}

describe('AppController.pushSignal() pushSignal method', () => {
  let appController: AppController;
  let mockSignalService: MockSignalService;
  let mockDeviceService: MockDeviceService;
  let mockConfigService: MockConfigService;

  beforeEach(() => {
    mockSignalService = new MockSignalService() as any;
    mockDeviceService = new MockDeviceService() as any;
    mockConfigService = new MockConfigService() as any;

    appController = new AppController(
      mockSignalService as any,
      mockConfigService as any,
      mockDeviceService as any,
    );
  });


  describe('Happy Path', () => {
    it('should return "OK" when rssiLevel is above MIN_VALUE', async () => {
      const payload: ISignalPayload = { deviceId: '123', rssiLevel: 15 };
      mockDeviceService.getById.mockResolvedValue({ id: '123' } as any);

      const result = await appController.pushSignal(payload);

      expect(result).toBe('OK');
      expect(mockSignalService.create).toHaveBeenCalledWith({ device: { id: '123' }, rssiLevel: 15 });
      expect(mockDeviceService.setActive).toHaveBeenCalledWith({ id: '123' });
      expect(mockDeviceService.setLost).not.toHaveBeenCalled();
    });

    it('should return "OK" when rssiLevel is below MIN_VALUE', async () => {
      const payload: ISignalPayload = { deviceId: '123', rssiLevel: 5 };
      mockDeviceService.getById.mockResolvedValue({ id: '123' } as any);

      const result = await appController.pushSignal(payload);

      expect(result).toBe('OK');
      expect(mockSignalService.create).toHaveBeenCalledWith({ device: { id: '123' }, rssiLevel: 5 });
      expect(mockDeviceService.setLost).toHaveBeenCalledWith({ id: '123' });
      expect(mockDeviceService.setActive).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should throw an HttpException when deviceService.getById throws an error', async () => {
      const payload: ISignalPayload = { deviceId: '123', rssiLevel: 15 };
      mockDeviceService.getById.mockRejectedValue(new Error('Device not found'));

      await expect(appController.pushSignal(payload)).rejects.toThrow(HttpException);
      await expect(appController.pushSignal(payload)).rejects.toThrow('Device not found');
    });

    it('should throw an HttpException when signalService.create throws an error', async () => {
      const payload: ISignalPayload = { deviceId: '123', rssiLevel: 15 };
      mockDeviceService.getById.mockResolvedValue({ id: '123' } as any);
      mockSignalService.create.mockRejectedValue(new Error('Database error'));

      await expect(appController.pushSignal(payload)).rejects.toThrow(HttpException);
      await expect(appController.pushSignal(payload)).rejects.toThrow('Database error');
    });
  });
});

// End of unit tests for: pushSignal
